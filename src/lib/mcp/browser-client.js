import {mcpDiagnosticError} from './diagnostics.js';
import {hydrateMcpAssetTransfer,ASSET_REFS_FEATURE} from './asset-transfer.js';
import { assertNoSecrets, MangaControlError } from './contract.js';

// This client only talks to the opt-in, same-origin loopback sidecar.
export function createMangaBridgeClient({ origin, fetcher = fetch, execute, cancel, onStatus = () => {}, ackTimeoutMs = 5000 }) {
  const parsed = new URL(origin);
  if (parsed.protocol !== 'http:' || parsed.hostname !== '127.0.0.1') throw new MangaControlError('LOOPBACK_REQUIRED', 'MCP requires its local loopback application.');
  let token, stopped = false, active = null, activeTask = null, disconnectTask = null;
  const uploaded=new Map();
  let transferController,features=[];
  const hydrate=value=>{if(value?.assetTransfer&&!features.includes(ASSET_REFS_FEATURE))throw new MangaControlError('CONTRACT_MISMATCH','Image reference transport was not negotiated.');return hydrateMcpAssetTransfer(value,{origin:parsed.origin,token,fetcher,signal:transferController?.signal});};
  async function encode(value) {
    if(typeof value==='string'&&value.startsWith('data:image/')) {
      if(!uploaded.has(value))uploaded.set(value,request('assets',{dataUrl:value}).catch(error=>{uploaded.delete(value);throw error;}));
      return uploaded.get(value);
    }
    if(value&&typeof value==='object'&&typeof value.base64Img==='string'&&value.base64Img) {
      const {base64Img,...metadata}=value;
      return {__mangaCandidate:true,image:await encode(`data:${value.mimeType||'image/png'};base64,${base64Img}`),metadata:await encode(metadata)};
    }
    if(Array.isArray(value))return Promise.all(value.map(encode));
    if(value&&typeof value==='object')return Object.fromEntries(await Promise.all(Object.entries(value).map(async([key,child])=>[key,await encode(child)])));
    return value;
  }
  async function request(route, body, auth = token) {
    if(!['complete','disconnect'].includes(route))return requestBody(route,body,auth);
    const controller=new AbortController();let timeout;
    try{return await Promise.race([requestBody(route,body,auth,controller.signal),new Promise((_,reject)=>{timeout=setTimeout(()=>{controller.abort();reject(new MangaControlError('ACK_TIMEOUT','Local service acknowledgement timed out; completion remains unconfirmed.'));},ackTimeoutMs);})]);}
    finally{clearTimeout(timeout);}
  }
  async function requestBody(route, body, auth = token, signal) {
    if (body) assertNoSecrets(body);
    if(body&&!['connect','assets'].includes(route))body=await encode(body);
    if(signal?.aborted)throw new MangaControlError('ACK_TIMEOUT','Local service acknowledgement timed out.');
    const response = await fetcher(`${origin}/mcp-bridge/${route}`, {
      ...(signal?{signal}:{}), method: body ? 'POST' : 'GET', credentials: 'omit', cache: 'no-store',
      headers: { Authorization: `Bearer ${auth}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const value = await response.json();
    if (!response.ok) throw new MangaControlError(value.error?.code ?? 'BRIDGE_FAILED', value.error?.message ?? 'Local bridge request failed.');
    if(['checkpoint-page','checkpoint-assets','complete'].includes(route))uploaded.clear();
    return value;
  }
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function poll() {
    while (!stopped) {
      try {
        const beat = await request('heartbeat', {});
        if(stopped)break;
        if (active && beat.cancelJobIds.includes(active.id)) {active.cancelRequested=true;transferController?.abort();cancel();}
        if (!active) {
          const { job } = await request('next');
          if(stopped)break;
          if (job) {
            active = job; onStatus({ connected: true, operation: job.operation, busy: true });
            activeTask = (async () => {
              let completion;
              try {
                transferController=new AbortController();
                await request('start',{jobId:job.id,attemptId:job.attemptId});
                const hydratedJob=await hydrate(job);
                if(stopped||job.cancelRequested)throw new MangaControlError('CANCELLED','Disconnected before the action started.');
                const outcome = await execute(hydratedJob, {
                checkpointAssets: assets=>request('checkpoint-assets',{jobId:job.id,attemptId:job.attemptId,assets}),
                savePage: page=>request('checkpoint-page',{jobId:job.id,attemptId:job.attemptId,...page}),
                loadPage: async pageId=>hydrate(await request('page-state',{jobId:job.id,attemptId:job.attemptId,pageId})),
                throwIfCancelled:()=>{if(job.cancelRequested||stopped)throw new MangaControlError('CANCELLED','The book operation was stopped.');},
                reportProgress:details=>onStatus({connected:true,busy:true,...details}),
              }); completion = { success: outcome.success !== false, result: outcome.result, ...(outcome.error?{error:mcpDiagnosticError(outcome.error)}:{}), ...(outcome.snapshot ? { snapshot: outcome.snapshot } : {}) }; }
              catch (error) { completion = { success: false, error: mcpDiagnosticError(error) }; }
              try { await request('complete', { jobId: job.id, attemptId: job.attemptId, ...completion }); }
              catch (error) { onStatus({ connected: false, error: error.message }); stopped = true; }
              finally { transferController=null; active = null; if (!stopped) onStatus({ connected: true, busy: false }); }
            })();
          }
        }
      } catch (error) { onStatus({ connected: false, error: error.message }); stopped = true; }
      if (!stopped) await sleep(1000);
    }
  }
  return {
    async connect(pairingToken, operations) {
      const session = await request('connect', { contractVersion: 1, clientId: crypto.randomUUID(), operations,features:[ASSET_REFS_FEATURE] }, pairingToken);
      features=session.features??[];token = session.token; onStatus({ connected: true, busy: false }); void poll();
    },
    disconnect() {
      if(disconnectTask)return disconnectTask;
      disconnectTask=(async()=>{
        stopped = true;
        if(active)active.cancelRequested=true;
        transferController?.abort();
        // Local abort is unconditional; service ACK is not the stop boundary.
        cancel();
        if(activeTask)await activeTask;
        let warning;
        try { if(token)await request('disconnect',{}); }
        catch(error){if(!['PAIRING_REQUIRED','STALE_CLIENT','BROWSER_NOT_CONNECTED'].includes(error.code))warning=`ローカル処理は停止しました。サーバーの切断確認は未取得: ${error.message}`;}
        token=null;uploaded.clear();onStatus({connected:false,...(warning?{error:warning}:{})});
        return {connected:false,...(warning?{warning}:{})};
      })();
      return disconnectTask;
    },
  };
}

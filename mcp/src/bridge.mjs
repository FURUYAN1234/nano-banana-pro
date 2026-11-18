import http from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { MangaControlError, assertNoSecrets } from '../../src/lib/mcp/contract.js';
import { readRuntimeBuild } from './runtime-build.mjs';
import {ASSET_REFS_FEATURE} from './asset-transfer.mjs';

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const secret = () => randomBytes(32).toString('base64url');
const equal = (a, b) => typeof a === 'string' && typeof b === 'string' && a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
export async function startBridge({ store, jobs, appRoot, distDirectory, port = 45931, mcpHttp = null }) {
  let origin, pairing = null, session = null;
  const server = http.createServer(async (req, res) => {
    const json = (status, value) => { const body=JSON.stringify(value); res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(body); };
    try {
      if (req.headers.host !== new URL(origin).host || (req.headers.origin && req.headers.origin !== origin)) return json(403, { error: { code: 'ORIGIN_REJECTED', message: 'Use the paired loopback application origin.' } });
      const url = new URL(req.url, origin);
      if (mcpHttp && ['/mcp','/health','/service/stop'].includes(url.pathname)) {
        const token = String(req.headers.authorization ?? '').replace(/^Bearer /, '');
        if (!equal(token, mcpHttp.token)) return json(401, {error:{code:'LOCAL_AUTH_REQUIRED',message:'Use this workspace’s local MCP service credentials.'}});
        if (url.pathname === '/health') return json(200, await mcpHttp.health());
        if(url.pathname==='/service/stop'){
          if(req.method!=='POST')return json(405,{error:{code:'METHOD_NOT_ALLOWED'}});
          await mcpHttp.assertCanStop();json(200,{stopping:true});
          setTimeout(()=>{void mcpHttp.stop();},0);return;
        }
        return await mcpHttp.handle(req,res);
      }
      if (url.pathname.startsWith('/mcp-bridge/')) {
        const token = String(req.headers.authorization ?? '').replace(/^Bearer /, '');
        const pairingRequest = url.pathname === '/mcp-bridge/connect';
        if (pairingRequest ? !pairing || pairing.expiresAt < Date.now() || !equal(token, pairing.token) : !session || session.expiresAt < Date.now() || !equal(token, session.token)) return json(401, { error: { code: 'PAIRING_REQUIRED', message: 'Obtain a fresh connection URL through manga_connection.' } });
        if(url.pathname.startsWith('/mcp-bridge/asset/')&&req.method==='GET'){
          const id=url.pathname.slice('/mcp-bridge/asset/'.length),transfer=session.transfer;
          if(!/^[a-f0-9]{64}$/.test(id)||!transfer||url.searchParams.get('jobId')!==transfer.jobId||url.searchParams.get('attemptId')!==transfer.attemptId||!Object.hasOwn(transfer.assets,id))throw new MangaControlError('ASSET_NOT_ALLOWED','This image is not part of the active page transfer.');
          const job=jobs.get(transfer.jobId);
          if(job.clientId!==session.clientId||job.attemptId!==transfer.attemptId||job.state!=='running'||job.cancelRequested)throw new MangaControlError('CANCELLED','This page transfer is no longer active.');
          const asset=transfer.assets[id],bytes=await store.assets.readBytes(asset);
          res.writeHead(200,{'Content-Type':asset.mimeType,'Content-Length':bytes.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(bytes);return;
        }
        let body = {};
        if (req.method === 'POST') {
          if (req.headers.origin !== origin || !String(req.headers['content-type'] ?? '').startsWith('application/json')) return json(403, { error: { code: 'ORIGIN_REJECTED', message: 'Bridge mutations require the paired application origin and JSON.' } });
          let size = 0; const chunks = [];
          for await (const chunk of req) { size += chunk.length; if (size > 72_000_000) throw new MangaControlError('PAYLOAD_TOO_LARGE', 'Upload images individually, below the existing 50 MB input limit.'); chunks.push(chunk); }
          body = JSON.parse(Buffer.concat(chunks).toString('utf8')); assertNoSecrets(body);
        }
        if (pairingRequest && req.method === 'POST') {
          if (!(await readRuntimeBuild(appRoot, distDirectory)).current) throw new MangaControlError('APP_BUILD_STALE', 'Rebuild the current source with npm run mcp:build; stale UI runtimes are not accepted.');
          if (body.contractVersion !== 1 || typeof body.clientId !== 'string' || !Array.isArray(body.operations) || body.operations.some(x => typeof x !== 'string')) throw new MangaControlError('CONTRACT_MISMATCH', 'The connected application has an incompatible bridge contract.');
          const features=Array.isArray(body.features)&&body.features.includes(ASSET_REFS_FEATURE)?[ASSET_REFS_FEATURE]:[];
          await jobs.connect(body.clientId, body.operations,features);
          session = { token: secret(), clientId: body.clientId,features, expiresAt: Date.now() + 8 * 60 * 60 * 1000 }; pairing = null;
          return json(200, { token: session.token, expiresAt: session.expiresAt,features });
        }
        if (url.pathname === '/mcp-bridge/next' && req.method === 'GET') {const value=await jobs.next(session.clientId);if(value.job)session.transfer=value.job.assetTransfer;return json(200,value);}
        if (url.pathname === '/mcp-bridge/start' && req.method === 'POST') return json(200, await jobs.start(session.clientId,body));
        if (url.pathname === '/mcp-bridge/assets' && req.method === 'POST') return json(200, await store.assets.putDataUrl(body.dataUrl));
        if (url.pathname === '/mcp-bridge/heartbeat' && req.method === 'POST') return json(200, jobs.heartbeat(session.clientId));
        if (url.pathname === '/mcp-bridge/complete' && req.method === 'POST') return json(200, await jobs.complete(session.clientId, body));
        if (url.pathname === '/mcp-bridge/checkpoint-assets' && req.method === 'POST') return json(200, await jobs.checkpointAssets(session.clientId, body));
        if (url.pathname === '/mcp-bridge/checkpoint-page' && req.method === 'POST') return json(200, await jobs.checkpointPage(session.clientId, body));
        if (url.pathname === '/mcp-bridge/page-state' && req.method === 'POST') {const value=await jobs.browserPage(session.clientId,body);session.transfer=value.assetTransfer;return json(200,value);}
        if (url.pathname === '/mcp-bridge/disconnect' && req.method === 'POST') { await jobs.disconnect(session.clientId); session = null; return json(200, { connected: false }); }
        return json(404, { error: { code: 'NOT_FOUND' } });
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return json(405, { error: { code: 'METHOD_NOT_ALLOWED' } });
      if (!(await readRuntimeBuild(appRoot, distDirectory)).current) return json(503, { error: { code: 'APP_BUILD_STALE', message: 'Run npm run mcp:build for the current source before opening this application.' } });
      const pathname = decodeURIComponent(url.pathname), relative = pathname === '/' || pathname === '/nano-banana-pro/' ? 'index.html' : pathname.replace(/^\/nano-banana-pro\//, '').replace(/^\//, '');
      const root = await fs.realpath(distDirectory), candidate = path.resolve(root, relative), real = await fs.realpath(candidate);
      if (!real.startsWith(root + path.sep) || !(await fs.stat(real)).isFile()) return json(403, { error: { code: 'PATH_REJECTED' } });
      const bytes = await fs.readFile(real);
      res.writeHead(200, { 'Content-Type': mime[path.extname(real)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' }); res.end(req.method === 'HEAD' ? undefined : bytes);
    } catch (error) { if(res.headersSent){res.destroy();return;}json(error.code === 'ENOENT' ? 404 : 400, { error: { code: error.code ?? 'BRIDGE_FAILED', message: error.message } }); }
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  origin = `http://127.0.0.1:${server.address().port}`;
  return { origin, close: () => new Promise(resolve => {
    server.close(resolve);
    // The authorized shutdown has already drained active jobs. A desktop MCP
    // client's open event stream must not keep the old workspace owner alive.
    server.closeAllConnections();
  }), async connection() {
    const build = await readRuntimeBuild(appRoot, distDirectory);
    if (!build.current) return { connected: false, requiresBuild: true, build, command: 'npm run mcp:build' };
    pairing = { token: secret(), expiresAt: Date.now() + 10 * 60 * 1000 };
    return { url: `${origin}/nano-banana-pro/#mcp=${pairing.token}`, expiresAt: pairing.expiresAt, connected: Boolean(session), note: 'Open this same-origin local application, explicitly enable MCP, and enter API keys only in its normal connection UI.' };
  } };
}

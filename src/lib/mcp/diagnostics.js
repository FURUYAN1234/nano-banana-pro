import {sanitizeFailureContext} from '../diagnostic-failure-context.js';
const encoder=new TextEncoder();
const stableRedaction=value=>value.replace(/Bearer \[credential omitted\]/gi,'[credential omitted]').replace(/\[credential omitted\]/g,'[redacted]');
const bytes=value=>encoder.encode(JSON.stringify(value)).length;
const token=value=>typeof value==='string'&&/^[A-Za-z0-9_.:-]{1,128}$/.test(value)&&!/(?:sk-|AIza|Bearer|token|secret|authorization)/i.test(value)?value:undefined;
export function boundedMcpFailureContext(input,maxBytes=32768){
 const clean=sanitizeFailureContext(input);if(!clean)return undefined;
 const result={originalLengths:clean.originalLengths,truncatedFields:[...clean.truncatedFields]};let remaining=maxBytes-2048;
 for(const[key,raw]of Object.entries(clean).sort(([a],[b])=>['stage','validationError','repairError'].includes(b)-['stage','validationError','repairError'].includes(a))){
  const value=typeof raw==='string'?stableRedaction(raw):raw;
  if(['originalLengths','truncatedFields'].includes(key))continue;
  if(typeof value!=='string'){if(bytes(value)<=remaining){result[key]=value;remaining-=bytes(value);}else result.truncatedFields.push(key);continue;}
  let end=value.length;
  if(bytes(value)>remaining){let lo=0,hi=end;while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(bytes(value.slice(0,mid))<=remaining)lo=mid;else hi=mid-1;}end=lo;result.truncatedFields.push(key);}
  result[key]=value.slice(0,end);remaining=Math.max(0,remaining-bytes(result[key]));
 }
 result.truncatedFields=[...new Set(result.truncatedFields)];return result;
}
export function mcpDiagnosticError(error){
 const context=boundedMcpFailureContext(error?.diagnosticContext||error?.failureContext);
 const message=stableRedaction(sanitizeFailureContext({validationError:String(error?.message??'The action failed.')}).validationError);
 return{code:token(error?.code)||'ACTION_FAILED',message,...(context?{failureContext:context}:{}),...Object.fromEntries(['diagnosticEventId','diagnosticRunId','diagnosticErrorCode'].flatMap(key=>token(error?.[key])?[[key,error[key]]]:[]))};
}
const isFailure=row=>row.event!=='workflow.warning'&&(['workflow.error','runtime.error','react.error','api.error'].includes(row.event)||(['api.response','api.payload'].includes(row.event)&&row.ok===false));
export function summarizeMcpDiagnostics(log,{since=0,maxEvents=20}={}){
 const source=(Array.isArray(log?.events)?log.events:[]).filter(row=>Number(row.time)>=since);
 const limited=source.slice(-Math.min(20,Math.max(1,maxEvents)));
 let events=limited.map(row=>{
  const value={time:row.time,severity:isFailure(row)?'error':row.event==='workflow.warning'?'warning':'info'};
  for(const key of ['id','event','runId','requestId','providerRequestId','operation','errorCode','errorKind','outcome','requestedModel','responseModel']){const safe=token(row[key]);if(safe)value[key]=safe;}
  for(const key of ['status','elapsedMs','inputTokens','outputTokens'])if(Number.isFinite(row[key]))value[key]=row[key];
  if(typeof row.ok==='boolean')value.ok=row.ok;
  if(row.failureContext)value.failureContext=boundedMcpFailureContext(row.failureContext,8192);
  return value;
 });
 while(bytes(events)>65536)events.shift();
 return{scope:'this-browser-origin',storageState:token(log?.storageState)||'unknown',observedAt:new Date().toISOString(),summary:{errors:source.filter(isFailure).length,warnings:source.filter(row=>row.event==='workflow.warning').length,totalEvents:source.length},events,omittedEvents:source.length-events.length,truncated:events.length<source.length||events.some(row=>row.failureContext?.truncatedFields?.length),note:'Warnings are not failed jobs. Context is sanitized and bounded; older omitted events and previous missing response bodies are not reconstructed.'};
}
export async function readMcpDiagnostics(readDiagnostics,options){
 try{return summarizeMcpDiagnostics(await readDiagnostics(),options);}catch{return{scope:'this-browser-origin',status:'unavailable',events:[],summary:null,truncated:false};}
}

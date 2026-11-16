import {MangaControlError} from './contract.js';

// Only a layout effect for the requested render may acknowledge this fence.
// Timers bound waiting and observe cancellation; they never imply a commit.
export function createMcpCommitFence(schedule) {
 let revision=0;
 const pending=new Map();
 function wait({timeoutMs=15000,throwIfCancelled=()=>{}}={}) {
  return new Promise((resolve,reject)=>{
   const id=++revision;
   let timer,poll;
   const cleanup=()=>{clearTimeout(timer);clearInterval(poll);pending.delete(id);};
   const fail=error=>{cleanup();reject(error);};
   const check=()=>{try{throwIfCancelled();}catch(error){fail(error);return false;}return true;};
   if(!check())return;
   pending.set(id,{resolve:snapshot=>{if(check()){cleanup();resolve(structuredClone(snapshot));}},fail});
   timer=setTimeout(()=>fail(new MangaControlError('REACT_COMMIT_TIMEOUT','The application did not commit the requested state before the deadline.')),timeoutMs);
   poll=setInterval(check,50);
   try{schedule(id);}catch(error){fail(error);}
  });
 }
 return {wait,commit(committed,snapshot){for(const [id,item] of pending)if(id<=committed)item.resolve(snapshot);},
  cancelAll(){for(const item of pending.values())item.fail(new MangaControlError('CANCELLED','The application was unmounted before state committed.'));}};
}

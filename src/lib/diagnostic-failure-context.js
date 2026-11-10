// Explicit failure-only inputs. Never traverse arbitrary API bodies or settings (which can contain keys).
const TEXT_LIMITS = Object.freeze({scenario:64000,castList:32000,userTopic:16000,finalPrompt:64000,
  repairResponse:64000,repairError:8000,validationResponse:64000,validationError:8000,
  stage:128,punchlineType:128,scenarioMode:128,userDirection:16000});
const redact = value => String(value)
  .replace(/data:[^\s"'<>]+/gi,'[image/data omitted]')
  .replace(/\b(?:sk-[\w-]+|AIza[\w-]+)\b/g,'[credential omitted]')
  .replace(/\bBearer\s+[^\s"'<>]+/gi,'Bearer [credential omitted]')
  .replace(/((?:api[_ -]?key|access[_ -]?token|authorization)\s*["']?\s*[:=]\s*["']?)[^\s,"'}]+/gi,'$1[credential omitted]');

export function sanitizeFailureContext(input) {
  if (!input || typeof input !== 'object') return undefined;
  const result={}, originalLengths={}, truncatedFields=new Set();
  let remainingBytes=512*1024;
  const encoder=new TextEncoder();
  const storedBytes=text=>encoder.encode(JSON.stringify(text)).length-2;
  const take=(value,limit,field)=>{
    const clean=redact(value);
    let end=Math.min(clean.length,limit);
    if(storedBytes(clean.slice(0,end))>remainingBytes){
      let lo=0,hi=end;
      while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(storedBytes(clean.slice(0,mid))<=remainingBytes)lo=mid;else hi=mid-1;}
      end=lo;
    }
    const text=clean.slice(0,end);
    remainingBytes-=storedBytes(text);
    if(end<clean.length)truncatedFields.add(field);
    return text;
  };
  for (const [key,limit] of Object.entries(TEXT_LIMITS)) {
    if (typeof input[key] !== 'string') continue;
    originalLengths[key]=Math.max(input[key].length,Number.isFinite(input.originalLengths?.[key]) ? input.originalLengths[key] : 0);
    result[key]=take(input[key],limit,key);
    if (input.truncatedFields?.includes(key)) truncatedFields.add(key);
  }
  if (Array.isArray(input.issues)) {
    result.issues=input.issues.slice(0,8).map(issue=>({
      panel:Number.isInteger(issue?.panel) ? issue.panel : null,
      reason:take(issue?.reason ?? '',4096,'issues'),
      dialogue:Array.isArray(issue?.dialogue) ? issue.dialogue.slice(0,32).map(entry=>({
        speaker:take(entry?.speaker ?? '',256,'issues'),
        text:take(entry?.text ?? '',4096,'issues'),
        ...(typeof entry?.sourceSpeaker==='string' ? {sourceSpeaker:take(entry.sourceSpeaker,256,'issues')} : {}),
      })) : [],
    }));
    if(input.issues.length>8 || input.issues.some(issue=>String(issue?.reason ?? '').length>4096
      || issue?.dialogue?.length>32 || issue?.dialogue?.some(entry=>String(entry?.text ?? '').length>4096
        || String(entry?.speaker ?? '').length>256 || String(entry?.sourceSpeaker ?? '').length>256))
      || input.truncatedFields?.includes('issues')) truncatedFields.add('issues');
  }
  if (!Object.keys(result).length) return undefined;
  return {...result,originalLengths,truncatedFields:[...truncatedFields]};
}

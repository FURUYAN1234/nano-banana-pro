import {createHash} from 'node:crypto';
import {readFileSync,readdirSync,lstatSync} from 'node:fs';
import {join} from 'node:path';

const skillRoot='mcp/skills/manga-book-production';
const requiredFiles=['SKILL.md','agents/openai.yaml','compatibility.json','bootstrap.ps1','Launch-Manga.cmd'];
export function collectMangaSkillEvidence(root){
 const directory=join(root,skillRoot);
 const files=[];
 const walk=relative=>{
  const location=join(directory,relative);
  const stat=lstatSync(location);
  if(stat.isSymbolicLink())throw new Error('Skill review must not follow linked resources.');
  if(stat.isDirectory())for(const name of readdirSync(location).sort())walk(relative?relative+'/'+name:name);
  else if(stat.isFile())files.push(relative);
 };
 walk('');
 for(const file of requiredFiles)if(!files.includes(file))throw new Error(`Required skill file is missing: ${file}`);
 const hash=createHash('sha256');
 for(const file of files.sort()){
  const bytes=readFileSync(join(directory,file));
  const content=/\.(?:md|txt|json|ya?ml|ps1|cmd|m?js|py)$/i.test(file)?bytes.toString('utf8').replace(/\r\n/g,'\n'):bytes;
  hash.update(file+'\0').update(content).update('\0');
 }
 return {version:JSON.parse(readFileSync(join(root,'package.json'),'utf8')).version,skillSha256:hash.digest('hex')};
}
export function validateMangaSkillReview(review,evidence,now=Date.now()){
 const errors=[];
 const present=value=>typeof value==='string'&&value.trim().length>0;
 if(!review||review.format!==1)return ['Manga production skill review is missing.'];
 if(review.version!==evidence.version)errors.push('Skill review belongs to another application version.');
 if(review.skillSha256!==evidence.skillSha256)errors.push('Skill changed after its production review.');
 const reviewedAt=Date.parse(review.reviewedAt);
 if(!Number.isFinite(reviewedAt)||reviewedAt>now+300000)errors.push('Skill review time is invalid.');
 else if(now-reviewedAt>24*60*60*1000)errors.push('Review production feedback again within 24 hours before deployment.');
 if(!present(review.reviewedSince)||!Array.isArray(review.sources)||!review.sources.length||review.sources.some(source=>!present(source)))errors.push('Identify the previous review and actual production/user-feedback records reviewed.');
 if(!Array.isArray(review.findings)||!review.findings.length)errors.push('Record generalized improvements or a reason no rule changed.');
 else for(const finding of review.findings){
  if(!finding||!['updated','already_covered','not_generalized'].includes(finding.disposition)||!present(finding.observation)||!present(finding.reason)||!present(finding.rule))errors.push('Every finding needs an observation, disposition, general rule and reason.');
 }
 if(!Array.isArray(review.checks)||!review.checks.length||review.checks.some(check=>!check||!present(check.name)||!present(check.evidence)||check.result!=='passed'))errors.push('Skill checks must identify actual passing evidence.');
 return errors;
}

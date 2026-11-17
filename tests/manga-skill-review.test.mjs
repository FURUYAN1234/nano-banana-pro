import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,rmSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,dirname,basename,resolve} from 'node:path';
import {collectMangaSkillEvidence,validateMangaSkillReview} from '../scripts/manga_skill_review.mjs';

test('a release requires production feedback review bound to the current skill and version',()=>{
 const root=mkdtempSync(join(tmpdir(),'manga-skill-review-'));
 try{
  const skill=join(root,'mcp/skills/manga-book-production');mkdirSync(join(skill,'agents'),{recursive:true});
  writeFileSync(join(root,'package.json'),'{"version":"8.0.2"}');
  for(const file of ['SKILL.md','agents/openai.yaml','compatibility.json','bootstrap.ps1','Launch-Manga.cmd'])writeFileSync(join(skill,file),'fixture\n');
  const evidence=collectMangaSkillEvidence(root);
  const review={format:1,...evidence,reviewedAt:new Date().toISOString(),reviewedSince:'previous release',sources:['bounded production record'],findings:[{observation:'Repeated confirmation in an approved workflow',disposition:'updated',rule:'Reuse approval for unchanged work',reason:'Applies across stories'}],checks:[{name:'one-page and multi-page routing',evidence:'fixture decision review',result:'passed'}]};
  assert.deepEqual(validateMangaSkillReview(review,evidence),[]);
  assert.ok(validateMangaSkillReview(null,evidence).length);
  for(const change of [{version:'8.0.1'},{sources:[]},{findings:[]},{findings:[null]},{checks:[null]},{checks:[{name:'unrun',evidence:'pending',result:'unverified'}]}])assert.ok(validateMangaSkillReview({...review,...change},evidence).length);
  const reviewTime=Date.parse(review.reviewedAt);
  assert.ok(validateMangaSkillReview(review,evidence,reviewTime+24*60*60*1000+1).some(e=>e.includes('24 hours')));
  assert.ok(validateMangaSkillReview(review,evidence,reviewTime-300001).some(e=>e.includes('time is invalid')));
  writeFileSync(join(skill,'SKILL.md'),'changed\n');
  assert.ok(validateMangaSkillReview(review,collectMangaSkillEvidence(root)).some(e=>e.includes('changed')));
  writeFileSync(join(skill,'SKILL.md'),'fixture\r\n');
  assert.deepEqual(collectMangaSkillEvidence(root),evidence,'Windows line endings must not invalidate the same content');
  mkdirSync(join(skill,'references'));
  writeFileSync(join(skill,'references','story-design.md'),'New storytelling method\n');
  assert.ok(validateMangaSkillReview(review,collectMangaSkillEvidence(root)).some(e=>e.includes('changed')),'New supporting resources must invalidate the old review');
  const withReference=collectMangaSkillEvidence(root);
  writeFileSync(join(skill,'references','story-design.md'),'Revised storytelling method\n');
  assert.notEqual(collectMangaSkillEvidence(root).skillSha256,withReference.skillSha256);
  assert.match(readFileSync(new URL('../scripts/pre_deploy_check.js',import.meta.url),'utf8'),/validateMangaSkillReview\(/);
 }finally{
  assert.equal(dirname(resolve(root)),resolve(tmpdir()));
  assert.ok(basename(root).startsWith('manga-skill-review-'));
  rmSync(root,{recursive:true,force:true});
 }
});

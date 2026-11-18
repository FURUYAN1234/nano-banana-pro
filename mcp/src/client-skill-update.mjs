import {createHash, randomUUID} from 'node:crypto';
import {promises as fs} from 'node:fs';
import {homedir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {setTimeout as delay} from 'node:timers/promises';
import {acquireWorkspaceLease} from './workspace-lease.mjs';

const name = 'manga-book-production';
const repository = 'FURUYAN1234/nano-banana-pro';
const prefix = `mcp/skills/${name}/`;
const receiptName = '.super-furu-skill.json';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = async file => JSON.parse((await fs.readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
const stat = async file => fs.lstat(file).catch(error => { if (error.code !== 'ENOENT') throw error; });

async function plainPath(file) {
  const parent = path.dirname(file);
  if (parent !== file) await plainPath(parent);
  if ((await stat(file))?.isSymbolicLink()) throw new Error(`Linked skill path: ${file}`);
}

function inside(root, entry) {
  if (!entry || entry.split('/').some(p => !p || p === '.' || p === '..' || /[\\:\x00-\x1f]/.test(p))) {
    throw new Error('Invalid skill package path.');
  }
  return path.join(root, ...entry.split('/'));
}

async function readSkillRelease(appRoot) {
  const installation = await readJson(path.join(appRoot, 'verified-install.json'));
  const pkg = await readJson(path.join(appRoot, 'package.json'));
  const tag = installation.tag;
  if (installation.repository !== repository || !/^v\d+\.\d+\.\d+$/.test(tag) || tag !== 'v' + pkg.version) {
    throw new Error('Skill source does not match the installed app release.');
  }
  const file = path.join(appRoot, 'SHA256SUMS.json');
  await plainPath(file);
  const bytes = await fs.readFile(file);
  if (installation.files['SHA256SUMS.json'] && installation.files['SHA256SUMS.json'] !== sha(bytes)) {
    throw new Error('Installed package manifest changed.');
  }
  const manifest = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, ''));
  if (manifest.schemaVersion !== 1 || manifest.algorithm !== 'sha256') throw new Error('Unknown package manifest.');
  const files = {};
  const source = path.join(appRoot, prefix);
  for (const [file, digest] of Object.entries(manifest.files).filter(([file]) => file.startsWith(prefix))) {
    const relative = file.slice(prefix.length);
    const absolute = inside(source, relative);
    await plainPath(absolute);
    if (!/^[a-f0-9]{64}$/.test(digest) || sha(await fs.readFile(absolute)) !== digest) throw new Error('Bundled skill differs from its package: ' + relative);
    files[relative] = digest;
  }
  for (const required of ['SKILL.md', 'compatibility.json']) {
    if (!files[required] || installation.files[prefix + required] !== files[required]) throw new Error('Unverified skill file: ' + required);
  }
  return {source, tag, files};
}

function historyDirectory(root) {
  const target = path.join(root,name);
  const key = process.platform === 'win32' ? target.toLowerCase() : target;
  return path.join(path.dirname(root), '.super-furu-skill-history', sha(key).slice(0,16));
}

async function clientRoots(home, env) {
  if (env.FURU_MANGA_SKILL_ROOT) {
    if (!path.isAbsolute(env.FURU_MANGA_SKILL_ROOT)) throw new Error('FURU_MANGA_SKILL_ROOT must be an absolute skills directory.');
    return [path.resolve(env.FURU_MANGA_SKILL_ROOT)];
  }
  const candidates = [...new Set([
    path.resolve(env.CODEX_HOME || path.join(home, '.codex'), 'skills'),
    path.join(home, '.agents', 'skills'), path.join(home, '.claude', 'skills'),
  ])];
  const existing = [];
  for (const root of candidates) {
    if (await stat(path.join(root, name)) || await stat(path.join(historyDirectory(root),'previous-pending'))) existing.push(root);
  }
  if (existing.length) return existing;
  for (const root of candidates) if ((await stat(path.dirname(root)))?.isDirectory()) return [root];
  return [];
}

function compareTags(a, b) {
  if (!/^v\d+\.\d+\.\d+$/.test(a)) throw new Error('Invalid installed skill version.');
  const newer = a.slice(1).split('.').map(Number), incoming = b.slice(1).split('.').map(Number);
  return newer.map((v, i) => v - incoming[i]).find(Boolean) || 0;
}

async function copyPlainTree(source, target) {
  await fs.mkdir(target, {recursive:true});
  for (const entry of await fs.readdir(source, {withFileTypes:true})) {
    const from = path.join(source, entry.name), to = path.join(target, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) await copyPlainTree(from, to);
    else if (entry.isFile()) await fs.copyFile(from, to);
    else throw new Error('The local skill contains a link or unsupported item: ' + entry.name);
  }
}

async function updateClient(root, release) {
  const target = path.join(root, name);
  const contains = (parent, child) => {
    const relative = path.relative(parent,child);
    return !path.isAbsolute(relative) && relative !== '..' && !relative.startsWith('..'+path.sep);
  };
  if (contains(release.source,target) || contains(target,release.source)) throw new Error('The client skill and packaged source must be separate.');
  await plainPath(target);
  const history = historyDirectory(root);
  await plainPath(history);
  await fs.mkdir(history,{recursive:true});
  let lease;
  for (let attempt = 0; !lease; attempt++) {
    try { lease = await acquireWorkspaceLease(history); }
    catch (error) { if (error.code !== 'WORKSPACE_BUSY' || attempt >= 50) throw error; await delay(100); }
  }
  const pending = path.join(history, 'previous-pending');
  const stage = path.join(history, 'staged');
  const retain = async () => {
    const backup = path.join(history, 'previous-' + new Date().toISOString().replace(/:/g,'-') + '-' + randomUUID().slice(0,8));
    await fs.rename(pending,backup);
    return backup;
  };
  try {
    await plainPath(pending); await plainPath(stage);
    if (await stat(pending)) {
      if (await stat(target)) await retain();
      else await fs.rename(pending,target);
    }
    if (await stat(stage)) await fs.rm(stage,{recursive:true,force:true});
    const previous = await stat(target);
    const marker = path.join(target, receiptName);
    await plainPath(marker);
    const receipt = await stat(marker) ? await readJson(marker) : null;
    if (previous && !previous.isDirectory()) throw new Error('Skill destination is not a directory: ' + target);
    if (previous && (await fs.readdir(target)).length) {
      const compat = path.join(target,'compatibility.json');
      await plainPath(compat);
      if (!(await stat(compat)) || (await readJson(compat)).repository !== repository || (receipt && receipt.repository !== repository)) {
        throw new Error('An unrelated or unrecognized skill occupies ' + target);
      }
    }
    if (receipt && compareTags(receipt.tag, release.tag) > 0) return {target,status:'newer-kept'};
    if (receipt?.tag === release.tag && Object.keys(release.files).length === Object.keys(receipt.files).length &&
        Object.entries(release.files).every(([file,digest]) => receipt.files[file] === digest)) {
      const present = await Promise.all(Object.keys(release.files).map(async file => {
        const local=inside(target,file); await plainPath(local); return (await stat(local))?.isFile();
      }));
      if (present.every(Boolean)) return {target,status:'current'};
    }
    await fs.mkdir(root,{recursive:true});
    await fs.mkdir(stage);
    if (previous) await copyPlainTree(target,stage);
    // Remove retired managed files from the active copy. The entire prior edition
    // (including any edits to those files) remains available in the backup.
    for (const file of Object.keys(receipt?.files || {})) {
      if (!Object.hasOwn(release.files,file)) await fs.rm(inside(stage,file),{force:true});
    }
    for (const [file,digest] of Object.entries(release.files)) {
      const to = inside(stage,file);
      await fs.mkdir(path.dirname(to),{recursive:true});
      await fs.copyFile(inside(release.source,file),to);
      if (sha(await fs.readFile(to)) !== digest) throw new Error('Failed to stage skill file: ' + file);
    }
    await fs.writeFile(path.join(stage,receiptName),JSON.stringify({repository,tag:release.tag,files:release.files}, null, 2)+'\n');
    if (previous) await fs.rename(target,pending);
    try { await fs.rename(stage,target); }
    catch(error) { if (previous) await fs.rename(pending,target); throw error; }
    return {target,status:previous?'updated':'installed',backup:previous?await retain():null};
  } finally { await lease.close(); }
}

export async function syncClientSkills(appRoot,{home=homedir(),env=process.env,report=message=>process.stderr.write(message+'\n')}={}) {
  const roots = await clientRoots(home,env);
  if (!roots.length) return [];
  const release = await readSkillRelease(appRoot);
  const results = [];
  for (const root of roots) {
    try {
      const result = await updateClient(root,release);
      report(`FURU skill ${release.tag} [${result.status}] ${result.target}${result.backup?' | Previous copy: '+result.backup:''}`);
      results.push(result);
    } catch(error) {
      report('FURU skill update failed at ' + root + ': ' + error.message);
      results.push({target:path.join(root,name),status:'failed',error:error.message});
    }
  }
  return results;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const results = await syncClientSkills(fileURLToPath(new URL('../../',import.meta.url)));
    if (results.some(result=>result.status==='failed')) process.exitCode=1;
  } catch(error) { process.stderr.write('FURU skill update: '+error.message+'\n'); process.exitCode=1; }
}

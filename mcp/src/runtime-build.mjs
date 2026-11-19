import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { MangaControlError } from '../../src/lib/mcp/contract.js';
export const toolGlobBuildFiles = [
  '.npmrc', 'scripts/tool-glob/package.json', 'scripts/tool-glob/index.cjs',
  'scripts/tool-glob/LICENSE.picomatch', 'scripts/tool-glob/README.md',
  'scripts/tool-glob/lib/constants.js', 'scripts/tool-glob/lib/scan.js', 'scripts/tool-glob/lib/utils.js',
];

export async function runtimeFingerprint(appRoot) {
  const hash = createHash('sha256');
  async function visit(directory) {
    for (const item of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(directory, item.name);
      if (item.isDirectory() && !(path.relative(appRoot, file).replaceAll('\\','/') === 'public/downloads')) await visit(file);
      else if (item.isFile()) { hash.update(path.relative(appRoot, file).replaceAll('\\', '/')); hash.update(await fs.readFile(file)); }
    }
  }
  await visit(path.join(appRoot, 'src'));
  await visit(path.join(appRoot, 'public'));
  const buildFiles = (await fs.readdir(appRoot)).filter(name => name === 'index.html' || name === 'package.json' || name === 'package-lock.json' || /^vite\.config\./.test(name));
  if (buildFiles.includes('package.json')) {
    const pkg = JSON.parse(await fs.readFile(path.join(appRoot, 'package.json'), 'utf8'));
    if (pkg.overrides?.picomatch === 'file:./scripts/tool-glob') buildFiles.push(...toolGlobBuildFiles);
  }
  for (const name of buildFiles.sort()) { hash.update(name); hash.update(await fs.readFile(path.join(appRoot, name))); }
  return hash.digest('hex');
}
export async function readRuntimeBuild(appRoot, distDirectory) {
  try {
    const stamp = JSON.parse(await fs.readFile(path.join(distDirectory, 'mcp-runtime.json'), 'utf8'));
    return { ...stamp, current: stamp.fingerprint === await runtimeFingerprint(appRoot) };
  } catch (error) { if (error.code !== 'ENOENT') throw error; return { current: false, reason: 'Build the current source with npm run mcp:build before connecting the application.' }; }
}

export async function verifyProductionRuntime(workspace, appRoot, version) {
 if(process.platform!=='win32'||!process.env.LOCALAPPDATA||!workspace)return;
 const installation=path.join(process.env.LOCALAPPDATA,'SuperFURU-Manga');
 if(path.relative(path.join(installation,'workspace'),workspace)!=='')return;

 version??=JSON.parse(await fs.readFile(path.join(appRoot,'package.json'),'utf8')).version;
 if(!/^\d+\.\d+\.\d+$/.test(version)){
  throw new MangaControlError('FURU_PRODUCTION_INSTALL_REQUIRED','Start an official version of FURU before opening the production workspace.');
 }
 const installed=path.join(installation,'versions','v'+version);
 if(path.relative(installed,appRoot)!==''){
  throw new MangaControlError('FURU_PRODUCTION_INSTALL_REQUIRED','Start the official installed version with Launch-Manga.cmd before opening the production workspace. Use an isolated workspace for development.');
 }
 const receipt=await fs.readFile(path.join(installed,'verified-install.json'),'utf8')
  .then(text=>JSON.parse(text.replace(/^\uFEFF/,'')))
  .catch(error=>{if(error.code!=='ENOENT')throw error;return null;});
 if(receipt?.repository!=='FURUYAN1234/nano-banana-pro'||receipt.tag!=='v'+version){
  throw new MangaControlError('FURU_PRODUCTION_INSTALL_REQUIRED','Repair the official installation with Launch-Manga.cmd before opening the production workspace.');
 }
 const build=await readRuntimeBuild(installed,path.join(installed,'dist'));
 if(!build.current||build.appVersion!==version||build.contractVersion!==1){
  throw new MangaControlError('APP_BUILD_STALE','The installed UI does not match the FURU service. Repair the official installation with Launch-Manga.cmd before opening the production workspace.');
 }
}

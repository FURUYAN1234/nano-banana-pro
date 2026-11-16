import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runtimeFingerprint } from './runtime-build.mjs';
const root = fileURLToPath(new URL('../../', import.meta.url));
const pkg = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'));
await fs.access(path.join(root, 'dist/index.html'));
await fs.writeFile(path.join(root, 'dist/mcp-runtime.json'), JSON.stringify({ contractVersion: 1, appVersion: pkg.version, fingerprint: await runtimeFingerprint(root) }, null, 2) + '\n');
process.stdout.write('MCP_CURRENT_RUNTIME_STAMPED\n');

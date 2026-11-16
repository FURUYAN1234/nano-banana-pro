import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { createInterface } from 'node:readline';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

export async function withMangaClient(workspace, callback, { bridge = false, port, downloadsDirectory } = {}) {
  const transport = new StdioClientTransport({ command: process.execPath,
    args: [fileURLToPath(new URL('./server.mjs', import.meta.url)), '--workspace', workspace, ...(bridge ? ['--bridge'] : []), ...(port !== undefined ? ['--port', String(port)] : []),...(downloadsDirectory?['--downloads',downloadsDirectory]:[])], stderr: 'pipe' });
  const client = new Client({ name: 'super-furu-manga-cli', version: '0.1.0' });
  // Drain the child's pipe immediately. Otherwise a fatal runtime diagnostic
  // disappears and ordinary stderr output can eventually block the child.
  transport.stderr?.on('data',chunk=>process.stderr.write(chunk));
  await client.connect(transport);
  try { return await callback(client); } finally { await client.close(); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), at = args.indexOf('--workspace'), inputAt = args.indexOf('--input');
  const workspace = at >= 0 ? args[at + 1] : process.env.MANGA_MCP_WORKSPACE;
  const interactiveAt = args.indexOf('--interactive');
  const bridgeAt = args.indexOf('--bridge'), portAt = args.indexOf('--port');
  const downloadsAt=args.indexOf('--downloads');
  const options = { bridge: bridgeAt >= 0, port: portAt >= 0 ? Number(args[portAt + 1]) : undefined,downloadsDirectory:downloadsAt>=0?args[downloadsAt+1]:undefined };
  const consumed = new Set([...(at >= 0 ? [at, at + 1] : []), ...(inputAt >= 0 ? [inputAt, inputAt + 1] : []), ...(interactiveAt >= 0 ? [interactiveAt] : []), ...(bridgeAt >= 0 ? [bridgeAt] : []), ...(portAt >= 0 ? [portAt, portAt + 1] : [])]);
  if(downloadsAt>=0){consumed.add(downloadsAt);consumed.add(downloadsAt+1);}
  const tool = args.find((value, i) => !consumed.has(i)) ?? 'manga_capabilities';
  try {
    if (interactiveAt >= 0) {
      await withMangaClient(workspace, async client => {
        const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });
        for await (const line of lines) {
          if (!line.trim()) continue;
          try {
            const request = JSON.parse(line);
            if (request.name === 'exit') { lines.close(); break; }
            const result = request.name === 'tools/list' ? await client.listTools()
              : request.name === 'resources/list' ? await client.listResources()
                : await client.callTool({ name: request.name, arguments: request.args ?? {} });
            process.stdout.write(JSON.stringify(result) + '\n');
          } catch (error) { process.stdout.write(JSON.stringify({ isError: true, error: { message: error.message } }) + '\n'); }
        }
      }, options);
      process.exitCode = 0;
    } else {
    const input = inputAt >= 0 ? JSON.parse(await readFile(args[inputAt + 1], 'utf8')) : {};
    const result = await withMangaClient(workspace, client => tool === 'tools/list' ? client.listTools() : client.callTool({ name: tool, arguments: input }), options);
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    if (result.isError) process.exitCode = 1;
    }
  } catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}

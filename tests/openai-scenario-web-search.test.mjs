import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

const projectRoot = new URL('..', import.meta.url);

test('OpenAI news scenarios use Responses web_search and preserve the scenario response text', async () => {
  const loaderDir = await mkdtemp(join(tmpdir(), 'nano-banana-node-loader-'));
  const loaderPath = join(loaderDir, 'extension-loader.mjs');
  await writeFile(loaderPath, `
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    if (error?.code === 'ERR_MODULE_NOT_FOUND' && specifier.startsWith('.')) {
      return nextResolve(\`${'${specifier}'}.js\`, context);
    }
    throw error;
  }
}
`, 'utf8');

  const runner = `
import { clearApiSession } from '${new URL('src/lib/api-session.js', projectRoot).href}';
import { callAI } from '${new URL('src/lib/ai-provider.js', projectRoot).href}';
import { setOpenAIApiKey } from '${new URL('src/lib/openai.js', projectRoot).href}';

const requests = [];
setOpenAIApiKey('sk-proj-test-key-for-web-search-routing-1234567890');
globalThis.fetch = async (url, init) => {
  requests.push({ url, body: JSON.parse(init.body) });
  return new Response(JSON.stringify({
    output: [{ type: 'message', content: [{ type: 'output_text', text: 'Topic: 最新ニュース\\nScenario: 4コマ本文', annotations: [{type: 'url_citation', url: 'https://example.com/source', title: '検索の出典'}] }] }]
  }), { status: 200, headers: { 'content-type': 'application/json' } });
};
const result = await callAI(
  'カテゴリから最新ニュースを選んで4コマを作成してください。',
  [],
  'CAST: テストキャラクター',
  undefined,
  { modelRoute: 'scenario', useWebSearch: true, timeoutMs: 1000 }
);
clearApiSession();
console.log(JSON.stringify({ result, requests }));
`;

  try {
    const output = execFileSync(process.execPath, [
      '--no-warnings',
      '--experimental-loader', pathToFileURL(loaderPath).href,
      '--input-type=module',
      '--eval', runner
    ], { encoding: 'utf8' });
    const { result, requests } = JSON.parse(output.trim().split(/\r?\n/).at(-1));

    assert.equal(result.text, 'Topic: 最新ニュース\nScenario: 4コマ本文');
    assert.deepEqual(result.sources, [{ url: 'https://example.com/source', title: '検索の出典' }]);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, 'https://api.openai.com/v1/responses');
    assert.equal(requests[0].body.model, 'gpt-6-astra');
    assert.deepEqual(requests[0].body.tools, [{ type: 'web_search' }]);
    assert.deepEqual(requests[0].body.input, [
      { role: 'developer', content: 'CAST: テストキャラクター' },
      { role: 'user', content: 'カテゴリから最新ニュースを選んで4コマを作成してください。' }
    ]);
  } finally {
    await rm(loaderDir, { recursive: true, force: true });
  }
});

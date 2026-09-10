import assert from 'node:assert/strict';
import test, {before, after} from 'node:test';
import {createServer} from 'vite';

let server;
let buildMangaPrompt;
before(async () => {
  server = await createServer({appType: 'custom', logLevel: 'silent', server: {middlewareMode: true}});
  ({buildMangaPrompt} = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});
after(async () => { await server?.close(); });

const castList = '## SpeakerA\n- orange hair, no glasses\n## SpeakerB\n- black hair, glasses';
const scenario = `## タイトル: 読書会
Location: 図書室
[1コマ目: 起]
状況: SpeakerAがSpeakerBに本を見せる。
SpeakerA「この本だよ。」
[2コマ目: 承]
[Camera: Over The Shoulder]
状況: SpeakerAの右肩越しにSpeakerBを見る構図。SpeakerAがSpeakerBに話しかける。
SpeakerA「本物はどこ？」
[3コマ目: 転]
状況: SpeakerBがSpeakerAに答える。
SpeakerB「ここです。」
[4コマ目: 結]
状況: SpeakerAがSpeakerBに手を振る。
SpeakerA「また明日！」`;
const build = (providerFamily = 'gemini', input = scenario) => buildMangaPrompt({scenario: input, castList, providerFamily, colorMode: 'color', punchlineType: 'Auto', systemVersion: 'test'});

test('Gemini strict script uses the same text/tail separation as panel dialogue', () => {
  const prompt = build();
  const lock = prompt.split('STRICT SCRIPT LOCK:')[1].split('MANGA CAMERA')[0];
  assert.doesNotMatch(lock, /SpeakerA「|SpeakerB「/);
  assert.match(lock, /Panel 2 required dialogue: TEXT \(PRINT VALUES ONLY\): B1="本物はどこ？"/);
  assert.match(lock, /TAILS \(METADATA; NEVER PRINT NAMES\): B1->\[SpeakerA\]/);
});

test('explicit shoulder owner in action is not reversed by conversation assistance', () => {
  for (const providerFamily of ['gemini', 'chatgpt']) {
    for (const direction of ['右肩越し', '左肩越し', '肩越し']) {
      const prompt = build(providerFamily, scenario.replace('右肩越し', direction));
      const panel = prompt.split('## Panel 2')[1]?.split('## Panel 3')[0] || prompt.split('Panel 2')[2];
      assert.ok(panel, 'panel must exist');
      assert.match(panel, /behind \[SpeakerA\]/);
      assert.doesNotMatch(panel, /behind \[SpeakerB\]/);
    }
  }
});

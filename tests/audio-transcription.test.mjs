import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server, audio, session;
const originalFetch = globalThis.fetch;
const recordedAudio = () => new Blob(['recorded audio fixture'], { type: 'audio/webm' });

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  audio = await server.ssrLoadModule('/src/lib/audio-transcription.js');
  session = await server.ssrLoadModule('/src/lib/api-session.js');
});

after(async () => {
  globalThis.fetch = originalFetch;
  session?.clearApiSession();
  await server?.close();
});

test('OpenAI dictation sends one audio transcription request and trims editable text', async () => {
  session.setApiSession('openai', 'test-only-credential');
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls++;
    assert.equal(url, 'https://api.openai.com/v1/audio/transcriptions');
    assert.equal(init.method, 'POST');
    assert.equal(init.body.get('model'), audio.OPENAI_TRANSCRIPTION_MODEL);
    assert.equal(init.body.get('language'), null);
    assert.equal(init.body.get('file').name, 'step2-dictation.webm');
    return Response.json({ text: '  音声からの文章  ' });
  };
  assert.equal(await audio.transcribeStep2Audio(recordedAudio(), 'openai'), '音声からの文章');
  assert.equal(calls, 1);
  assert.equal(audio.appendDictatedText('先に入力した文章', ' 音声からの文章 '), '先に入力した文章\n音声からの文章');
  assert.equal(audio.appendDictatedText('先に入力した文章\n', '追加'), '先に入力した文章\n追加');
  assert.equal(audio.appendDictatedText('先に入力した文章', '   '), '先に入力した文章');
});

test('Gemini dictation sends inline audio to the selected provider only', async () => {
  session.setApiSession('gemini', 'test-only-credential');
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls++;
    assert.match(url, /models\/gemini-3\.8-flash:generateContent$/);
    const body = JSON.parse(init.body);
    assert.equal(body.contents[0].parts[1].inlineData.mimeType, 'audio/webm');
    assert.equal(atob(body.contents[0].parts[1].inlineData.data), 'recorded audio fixture');
    return Response.json({ candidates: [{ content: { parts: [{ text: ' 話した内容 ' }] } }] });
  };
  assert.equal(await audio.transcribeStep2Audio(recordedAudio(), 'gemini'), '話した内容');
  assert.equal(calls, 1);
});

test('missing provider, bad recording and empty transcription never alter the input', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json({ text: '  ' }); };
  session.clearApiSession();
  await assert.rejects(audio.transcribeStep2Audio(recordedAudio(), 'openai'), /APIに接続/);
  session.setApiSession('openai', 'test-only-credential');
  await assert.rejects(audio.transcribeStep2Audio(new Blob([], { type: 'audio/webm' }), 'openai'), /短く録音/);
  await assert.rejects(audio.transcribeStep2Audio(recordedAudio(), 'unknown'), /不正/);
  assert.equal(calls, 0);
  await assert.rejects(audio.transcribeStep2Audio(recordedAudio(), 'openai'), /文字を取得できません/);
  assert.equal(calls, 1);
});

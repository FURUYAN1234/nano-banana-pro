import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

test('official SDK stdio discovers tools, persists false settings and snapshot across server restart', async () => {
  const root = process.env.MANGA_MCP_TEST_ROOT ?? path.join(tmpdir(), 'super-furu-manga-tests');
  await fs.mkdir(root, { recursive: true }); const workspace = await fs.mkdtemp(path.join(root, 'stdio-'));
  const downloads=path.join(workspace,'downloads');await fs.mkdir(downloads);
  const serverPath = fileURLToPath(new URL('../src/server.mjs', import.meta.url));
  async function connect() {
    const transport = new StdioClientTransport({ command: process.execPath, args: [serverPath, '--workspace', workspace,'--downloads',downloads], stderr: 'pipe' });
    const client = new Client({ name: 'manga-vertical-test', version: '1.0.0' });
    await client.connect(transport); return client;
  }
  let client = await connect();
  const call = async (name, args) => {
    const result = await client.callTool({ name, arguments: args });
    assert.equal(result.isError, undefined, JSON.stringify(result)); return result.structuredContent;
  };
  try {
    const discoveredTools=(await client.listTools()).tools; assert.ok(discoveredTools.some(x=>x.name==='manga_capabilities')); assert.ok(discoveredTools.some(x=>x.name==='manga_save_status'&&x.annotations?.readOnlyHint===true)); console.info('SDK discovered tool count:',discoveredTools.length);
    const cap = await call('manga_capabilities', {}); assert.equal(cap.totalPagesIncludesCover, true);
    const p = await call('manga_project_create', { name: 'Vertical', idempotencyKey: 'create', totalPages: 4, settings: { showTitle: false, showWatermarks: false } });
    const saveStatus = await call('manga_save_status', {projectId:p.id}); assert.equal(saveStatus.enabled,true); assert.equal(saveStatus.verification.status,'not_generated'); assert.equal(saveStatus.browserDownloads.required,false); assert.equal(cap.exports.statusTool,'manga_save_status');
    const pageId = p.pages[0].id;
    const updated = await call('manga_page_update', { projectId: p.id, pageId, expectedRevision: p.revision, idempotencyKey: 'page', settings: { pageNumber: false }, panelCount: 2 });
    await call('manga_snapshot', { projectId: p.id, pageId, action: 'write', expectedRevision: updated.revision, idempotencyKey: 'snapshot', snapshot: { format: 1, scenario: 'Saved scenario', finalPrompt: 'Saved prompt', settings: { showTitle: false, showWatermarks: false } } });
    await client.close(); client = await connect();
    const snapshot = await call('manga_snapshot', { projectId: p.id, pageId, action: 'read' });
    assert.equal(snapshot.settings.showTitle, false); assert.equal(snapshot.settings.showWatermarks, false); assert.equal(snapshot.settings.pageNumber, false);
    assert.equal(snapshot.snapshot.scenario, 'Saved scenario');
    const forbidden = await client.callTool({ name: 'manga_snapshot', arguments: { projectId: p.id, pageId, action: 'write', expectedRevision: snapshot.revision, idempotencyKey: 'secret', snapshot: { apiKey: 'not allowed' } } });
    assert.equal(forbidden.isError, true);
    const plan = await call('manga_plan', { projectId: p.id, expectedRevision: snapshot.revision, idempotencyKey: 'plan', action: 'set', outline: 'Outline', detail: 'Detailed plan' });
    await call('manga_request_approval', { projectId: p.id, expectedRevision: plan.revision, idempotencyKey: 'request', action: 'request' });
    const current = await call('manga_project_get', { projectId: p.id }); assert.equal(current.approval, null);
    await call('manga_request_approval', { projectId: p.id, expectedRevision: current.revision, idempotencyKey: 'approve', action: 'record_user_response', planHash: current.planHash, planRevision: current.plan.revision, decision: 'approve', userResponse: 'OK' });
    assert.ok((await call('manga_project_get', { projectId: p.id })).approval);
  } finally { await client.close(); }
});

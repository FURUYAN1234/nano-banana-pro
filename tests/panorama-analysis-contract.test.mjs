import test from 'node:test';
import assert from 'node:assert/strict';
import {parse360Analysis} from '../src/lib/panorama360.js';

test('panorama analysis accepts a complete JSON result', () => {
  assert.deepEqual(parse360Analysis('```json\n{"location":"図書館","lighting":"窓光","spatialType":"indoor","objects":"机","mood":"静か"}\n```'), {
    location:'図書館',lighting:'窓光',spatialType:'indoor',objects:'机',mood:'静か'
  });
});

test('panorama analysis does not invent a successful result for malformed or empty JSON', () => {
  for (const response of ['not JSON', '{bad}', '{}', '{"location":"図書館"}']) {
    assert.throws(() => parse360Analysis(response), /360°空間解析/);
  }
});

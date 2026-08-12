import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(
  new URL('../src/hooks/useMangaWorkflow.js', import.meta.url),
  'utf8',
);

test('manual scenario takeover invalidates an in-flight full-auto scenario result', () => {
  assert.match(source, /const scenarioRunEpochRef = useRef\(0\)/);
  assert.match(
    source,
    /const setScenarioFromUser = \(nextScenario\) => \{[\s\S]*?scenarioRunEpochRef\.current \+= 1;[\s\S]*?fullAutoAbortRef\.current = true;[\s\S]*?setScenario\(nextScenario\);[\s\S]*?\};/,
  );
  assert.match(source, /setScenario: setScenarioFromUser/);
});

test('STEP2 applies an async result only while its captured run epoch is current', () => {
  assert.match(
    source,
    /const scenarioRunEpoch = \+\+scenarioRunEpochRef\.current;[\s\S]*?const result = await generateScenario\([\s\S]*?if \(scenarioRunEpoch !== scenarioRunEpochRef\.current\) \{[\s\S]*?return null;[\s\S]*?\}[\s\S]*?setScenario\(finalScenarioText\);/,
  );
});

test('stopping full-auto invalidates the current scenario run before clearing loading state', () => {
  assert.match(
    source,
    /if \(isFullAutoMode\) \{[\s\S]*?fullAutoAbortRef\.current = true;[\s\S]*?scenarioRunEpochRef\.current \+= 1;[\s\S]*?setIsSearching\(false\);/,
  );
});

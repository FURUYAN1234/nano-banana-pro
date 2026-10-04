import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { assertPublicSkillDistribution } from '../scripts/public_skill_distribution.mjs';

test('rejects proprietary PDF skill documents in public source', () => {
    for (const file of ['.agents/skills/pdf/SKILL.md', '.agents/skills/pdf/forms.md', '.agents\\skills\\pdf\\reference.md']) {
        assert.throws(() => assertPublicSkillDistribution([file], { skills: {} }), /outside public source/);
    }
});
test('rejects automatic reinstallation from shared lock', () => {
    assert.throws(() => assertPublicSkillDistribution([], { skills: { pdf: { source: 'anthropics/skills' } } }), /outside public source/);
});
test('does not exclude application PDFs or unrelated dependencies', () => {
    assert.doesNotThrow(() => assertPublicSkillDistribution(['public/manual.pdf', '.agents/skills/other/SKILL.md'], { skills: { other: {} } }));
});
test('candidate tracked source and shared lock exclude the skill', () => {
    const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
    assertPublicSkillDistribution(tracked, JSON.parse(fs.readFileSync('skills-lock.json', 'utf8')));
});

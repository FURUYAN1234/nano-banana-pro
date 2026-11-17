import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile, rm} from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

test('production Tailwind includes app sources and excludes files missing from the portable package', async () => {
  const directory=await mkdtemp(path.join(tmpdir(),'manga-css-scope-'));
  try {
    await mkdir(path.join(directory,'src'));
    const header=(await readFile(new URL('../src/index.css',import.meta.url),'utf8')).split('\n').filter(line=>/^@(?:tailwind|source)\b/.test(line)).join('\n');
    await writeFile(path.join(directory,'src/index.css'),header);
    await writeFile(path.join(directory,'src/Panel.jsx'),'<div className={active ? "w-[137px] min-[561px]:col-start-2" : "w-[138px] disabled:opacity-50"} />');
    await writeFile(path.join(directory,'index.html'),'<div class="w-[211px]"></div>');
    await writeFile(path.join(directory,'unshipped-test.md'),'Fixture only: w-[999px]');
    const css=(await postcss([tailwind({base:directory})]).process(header,{from:path.join(directory,'src/index.css')})).css;
    assert.match(css,/width:\s*137px/);
    assert.match(css,/width:\s*138px/);
    assert.match(css,/width:\s*211px/);
    assert.match(css,/grid-column-start:\s*2/);
    assert.match(css,/:disabled/);
    assert.doesNotMatch(css,/width:\s*999px/);
  } finally { await rm(directory,{recursive:true,force:true}); }
});

import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let buildScenarioEnhancementPrompt;
let getCameraForPanel;
let getCameraForChatGPT;
let extractPlacementRule;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildScenarioEnhancementPrompt } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
  ({ getCameraForPanel, getCameraForChatGPT, extractPlacementRule } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
});
after(async () => { await server?.close(); });

test('abstract overhead panels retain camera projection and independent scripted gaze', () => {
  const directed = scenario
    .replace('[Camera: アイレベル、水平、静かな固定ショット]', '[Camera: 右上から60度の俯瞰]')
    .replace('状況: Bが本を受け取り、静かに表紙を見る。', '状況: Bは本に視線を向ける。Aは棚を見つめる。背景は意図的な白地へ省略する。')
    .replace('B「少し待って」', 'B「少し待って」\nA「そちらです」');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: directed, castList, providerFamily, colorMode, systemVersion: 'test' });
      const panel = prompt.split('## Panel 2')[1].split('## Panel 3')[0];
      assert.match(panel, /EXPLICIT DETAIL CAMERA LOCK/);
      assert.match(panel, /projection even with omitted BG/);
      assert.match(panel, /scripted gaze target/);
      assert.doesNotMatch(panel, /address (?:their )?counterparts|mutual gaze; reactors watch/);
      assert.ok(panel.includes('Bは本に視線を向ける。Aは棚を見つめる。'));
    }
  }
});

test('Windows line endings preserve location and outfit in both provider and medium paths', () => {
  const source = scenario.replace('Outfit: default', 'Outfit: 私服（casual wear）');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const options = { castList, providerFamily, colorMode, systemVersion: 'test', cinematicTechniques: false };
      const expected = buildMangaPrompt({ ...options, scenario: source });
      const actual = buildMangaPrompt({ ...options, scenario: source.replaceAll('\n', '\r\n') });
      assert.ok(actual.includes('私服（casual wear）'), 'CRLF must not drop the outfit override');
      assert.ok(actual.includes('図書室'), 'CRLF must not drop location');
      assert.equal(actual, expected, 'line-ending transport must not change the image prompt');
    }
  }
});

test('outfit overrides exclude reference clothing even in the unweighted cast fallback', () => {
  const source = scenario.replace('Outfit: default', 'Outfit: 動きやすい私服');
  const reference = 'Character [A]: short dark hair\n服装: school uniform\nCharacter [B]: long hair, glasses\n衣装: sailor uniform';
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: source, castList: reference, providerFamily, colorMode, systemVersion: 'test' });
      assert.ok(prompt.includes('動きやすい私服'));
      assert.match(prompt, /long hair/);
      assert.doesNotMatch(prompt, /school uniform|sailor uniform/);
    }
  }
});

test('explicit outfit overrides stay intentionally separate from the setting era', () => {
  const explicitOutfit = 'AとBは精密な異世界騎士装束';
  const source = scenario
    .replace('Location: 図書室', 'Location: 昭和40年代の商店街')
    .replace('Outfit: default', `Outfit: ${explicitOutfit}`);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario: source, castList, providerFamily, colorMode: 'color', systemVersion: 'test' });
    assert.ok(prompt.includes(explicitOutfit));
    assert.match(prompt, /explicit outfit.*overrides.*setting.*era|setting.*era.*must not restyle.*explicit outfit/i);
    assert.match(prompt, /intentional contrast|mismatch/i);
    assert.match(prompt, /do not replace.*period-appropriate clothing|never period-substitute|no period substitution/i);
  }

  const inferred = buildMangaPrompt({ scenario, castList, providerFamily: 'chatgpt', colorMode: 'color', systemVersion: 'test' });
  assert.match(inferred, /when no outfit is specified.*infer.*setting|no outfit: infer from setting/i);
});

test('occupational uniforms and visitor clothes survive final assembly in both media and ending modes', () => {
  const assignment = 'Aは勤務中の警察官の制服、Bは来訪者の私服';
  const source = scenario.replace('Outfit: default', `Outfit: ${assignment}`);
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
        const prompt = buildMangaPrompt({ scenario: source, castList, providerFamily, colorMode, punchlineType, systemVersion: 'test' });
        assert.ok(prompt.includes(assignment));
        assert.doesNotMatch(prompt, /警察官のフォーマルな服装/);
        assert.match(prompt, /role-specific outfit assignments/);
        assert.doesNotMatch(prompt, /All characters (?:are wearing|MUST wear exactly)/);
        if (providerFamily === 'gemini' && punchlineType === 'SeriousDocumentary') {
          assert.match(prompt, /Garment items come from the active outfit override/);
          assert.doesNotMatch(prompt, /Preserve each named character's garment items[^\n]*from the character sheet/);
        }
      }
    }
  }
});

test('explicit abstract beats preserve performance and survive both provider and medium paths', () => {
  const directed = scenario.replace('Bが本を掲げて大きくのけぞる。', 'Bが本を掲げて大きくのけぞる。背景: このコマだけ意図的な白地へ省略し、Bの手と本は残す。');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: directed, castList, providerFamily, colorMode, systemVersion: 'test' });
      assert.match(prompt, /ABSTRACT BEAT:.*scripted.*(?:omit|omission)/i);
      assert.match(prompt, /INTERACTION:.*(?:reaction|reactors).*readable/i);
      assert.match(prompt, /ACTING:.*(?:gaze|hands)/i);
      assert.ok(prompt.includes('このコマだけ意図的な白地へ省略し、Bの手と本は残す。'));
      assert.ok(prompt.includes('超ローアングル、強い短縮遠近法、全身'));
      assert.doesNotMatch(prompt, /VFX stay overlays behind or around the cast and never replace the physical setting|Effects never replace setting or story evidence/);
      for (const line of ['こちらです', 'ありがとう', '少し待って', 'これだった！', 'またどうぞ']) assert.ok(prompt.includes(line));
      assert.equal((prompt.match(/## Panel \d/g) || []).length, 4);
    }
  }
});

const castList = '- Character [A]: short dark hair, no glasses\n- Character [B]: long hair, glasses\n- Character [C]: curly hair, no glasses';
const scenario = `## タイトル: 返却の間
Location: 図書室
Outfit: default
[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: 左前からの引き]
状況: AがBに本を差し出す。
A「こちらです」
B「ありがとう」
[2コマ目: 承]
[EMOTION: NORMAL]
[Camera: アイレベル、水平、静かな固定ショット]
状況: Bが本を受け取り、静かに表紙を見る。
B「少し待って」
[3コマ目: 転]
[EMOTION: NORMAL]
[Camera: 超ローアングル、強い短縮遠近法、全身]
状況: Bが本を掲げて大きくのけぞる。
B「これだった！」
[4コマ目: 結]
[EMOTION: NORMAL]
[Camera: 右後方からの引き]
状況: Aが棚に本を戻す。Bは静かにうなずく。
A「またどうぞ」`;

test('Web prompts retain limb ownership and occlusion checks under every compaction budget', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      for (const size of [0, 6000, 18000]) {
        const input = scenario.replace('AがBに本を差し出す。', `AがBに本を差し出す。${'静かな室内。'.repeat(size / 6)}`);
        const prompt = buildMangaPrompt({ scenario: input, castList, providerFamily, colorMode, systemVersion: 'test' });
        const minimal = prompt.includes('connect each L/R hand-arm-shoulder');
        const compact = prompt.includes('hands-wrists-elbows-shoulders');
        if (minimal) {
          assert.match(prompt, /foot-leg-hip.*natural occlusion\/crop/);
          assert.match(prompt, /no stray\/extra\/missing\/merged\/detached\/mirrored\/malformed limbs, even near furniture/);
          assert.match(prompt, /keep Action\/foreshortening/);
        } else if (compact) {
          assert.match(prompt, /feet-ankles-knees-hips connected/);
          assert.match(prompt, /L\/R limbs visible\/occluded\/cropped plausibly/);
          assert.match(prompt, /No stray\/extra\/missing\/merged\/detached\/mirrored\/malformed limbs, even by furniture/);
          assert.match(prompt, /Keep Action\/crop\/foreshortening; never expose hidden limbs/);
        } else {
          assert.equal((prompt.match(/LIMB OWNERSHIP CHECK/g) || []).length, 1);
          assert.match(prompt, /left\/right arms, hands, legs and feet as visible, naturally occluded or outside the frame/);
          assert.match(prompt, /wrist\/elbow to its own shoulder/);
          assert.match(prompt, /ankle\/knee to its own hip/);
          assert.match(prompt, /No ownerless, extra, fused, detached or inexplicably missing limbs/);
          assert.match(prompt, /do not expose naturally hidden limbs or force full-body framing/);
          assert.match(prompt, /without changing the action or composition/);
        }
        assert.equal((prompt.match(/## Panel \d/g) || []).length, 4);
        for (const line of ['こちらです', 'ありがとう', '少し待って', 'これだった！', 'またどうぞ']) assert.ok(prompt.includes(line));
        if (size === 18000 && providerFamily === 'chatgpt') assert.ok(compact || minimal);
      }
    }
  }
});

test('scripted calm and bold cameras retain their own amplitude without added distortion', () => {
  for (const camera of ['アイレベル、水平、静かな固定ショット', '穏やかな俯瞰、傾きなし', '超ローアングル、強い短縮遠近法、全身']) {
    const result = getCameraForPanel(`[Camera: ${camera}]`, ['unused'], { index: 0 });
    assert.ok(result.startsWith(camera + '; '));
    assert.doesNotMatch(result.slice(camera.length), /EXTREME|SEVERE|ultra extreme|10 meters|flat on the ground/i);
    assert.match(result, /NEVER draw text of camera names/);
  }
});

test('missing ChatGPT camera advances across panels instead of repeating the first fallback', () => {
  const state = { index: 0 };
  const cameras = Array.from({ length: 4 }, () => getCameraForChatGPT('状況: Aが本を置く。', state));
  assert.equal(new Set(cameras).size, 4);
  assert.equal(state.index, 4);
  getCameraForChatGPT('[Camera: 水平の固定ショット]', state);
  assert.equal(state.index, 4);
});

test('bubbles can use nearby negative space without centering every balloon on a head', () => {
  for (const dialogue of ['A「一番」\nB「二番」', 'A「一番」\nB「二番」\nC「三番」']) {
    const result = extractPlacementRule(dialogue, castList);
    assert.doesNotMatch(result, /MUST also be centered|directly above THAT|tail MUST point down/i);
    assert.match(result, /right.*left/i);
    assert.match(result, /tail.*speaker/i);
    assert.match(result, /stagger|negative space/i);
    assert.match(result, /DO NOT MIRROR/i);
  }
});

test('both final prompts carry reading rhythm through color, monochrome and serious modes', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
        const prompt = buildMangaPrompt({ scenario, castList, providerFamily, colorMode, punchlineType, systemVersion: 'test' });
        assert.match(prompt, /PAGE READING RHYTHM/);
        assert.match(prompt, /PROFESSIONAL VISUAL FLOW PRIORITY/);
        assert.match(prompt, /panel entry.*primary focal.*reaction.*prop.*next bubble.*next panel/is);
        assert.match(prompt, /top-right.*right-to-left/is);
        assert.match(prompt, /gaze.*head.*torso.*hands.*diagonals.*light.*contrast.*negative space/is);
        assert.match(prompt, /story beat.*joke.*clarity/is);
        assert.match(prompt, /one primary focal target/i);
        assert.match(prompt, /quiet beat/i);
        assert.match(prompt, /negative space/i);
        assert.match(prompt, /TAIL GEOMETRY:.*lower.*speaker-facing/i);
        assert.match(prompt, /never.*(?:cross|overlap|pass over).*(?:head|face|hair)/i);
        assert.match(prompt, /shortest unobstructed/i);
        assert.doesNotMatch(prompt, /one fixed environmental anchor plus at least two|1 fixed anchor \+ 2 physical setting cues|Negative space is only for bubbles/i);
        assert.doesNotMatch(prompt, /ABOVE CAMERA DISTORTION MAX|BODY DEFORM: Near body parts 50%/);
        assert.equal((prompt.match(/## Panel \d/g) || []).length, 4);
        assert.ok(prompt.includes('アイレベル、水平、静かな固定ショット'));
        assert.ok(prompt.includes('超ローアングル、強い短縮遠近法、全身'));
        for (const line of ['こちらです', 'ありがとう', '少し待って', 'これだった！', 'またどうぞ']) assert.ok(prompt.includes(line));
      }
    }
  }
});

test('scenario creation avoids interchangeable expanding props across topics and ending modes', () => {
  for (const manualTopic of ['ハンズで工具を選ぶ', 'EVの充電設備を増やす', '長寿祝いの統計展示']) {
    for (const punchlineType of ['Auto', 'RunningGag', 'Explosion', 'Surreal', 'Documentary', 'SeriousDocumentary']) {
      const prompt = getScenarioPrompt({ randomCategory: '日常', targetDate: '2026-09-15', inputMode: 'manual', manualTopic, newsContext: '', searchTopicKeywords: '', customLocation: '', customOutfit: '', ragReactions: '', punchlineType, comedyTone: 'HighTension', styleJson: null });
      assert.match(prompt, /題材と小道具の因果/);
      assert.match(prompt, /数値.*(?:紙|図表).*既定/);
      assert.match(prompt, /長さ.*枚数.*だけ/);
      assert.match(prompt, /形.*機能.*材質/);
      assert.match(prompt, /異なる.*因果.*候補/);
      assert.match(prompt, /題材.*差し替えても成立/);
      assert.match(prompt, /VisualEvidence/);
      assert.ok(prompt.includes(manualTopic));
      assert.doesNotMatch(prompt, /限界突破が黄金パターン|背景に脈絡のない巨大オブジェクト/);
      if (punchlineType === 'RunningGag') assert.match(prompt, /強制オチ指定: 天丼/);
      if (punchlineType === 'Explosion') assert.match(prompt, /強制オチ指定: 爆発/);
      if (punchlineType === 'SeriousDocumentary') assert.match(prompt, /事実|原文/);
    }
  }
});

test('selected enhancement prevents unrequested prop expansion without replacing the existing story', () => {
  for (const selectedCategories of [['body', 'effects', 'background', 'gag'], ['background'], ['dialogue'], ['camera'], ['gag']]) {
    for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
      const prompt = buildScenarioEnhancementPrompt({ scenario, selectedCategories, punchlineType });
      assert.match(prompt, /題材と小道具の因果/);
      assert.match(prompt, /巻物.*蛇腹.*連続用紙/);
      assert.match(prompt, /明示.*(?:形|材質|小道具).*保持/);
      assert.match(prompt, /選択されていないカテゴリは変更しない/);
      assert.match(prompt, /新たな.*(?:小道具|仕掛け).*追加しない/);
      assert.match(prompt, /既存.*(?:事件|展開).*置き換えない/);
      assert.doesNotMatch(prompt, /異なる.*因果.*候補/);
      assert.equal(prompt.split('【元のシナリオ】\n')[1], scenario);
    }
  }
});

test('explicit paper mechanisms and exact acting survive both image providers and media', () => {
  for (const prop of ['巻物', '蛇腹の地図', '連続用紙']) {
    const directed = scenario.replaceAll('本', prop);
    for (const providerFamily of ['chatgpt', 'gemini']) {
      for (const colorMode of ['color', 'monochrome']) {
        const prompt = buildMangaPrompt({ scenario: directed, castList, providerFamily, colorMode, systemVersion: 'test' });
        assert.ok(prompt.includes(`AがBに${prop}を差し出す。`));
        assert.ok(prompt.includes(`Bが${prop}を掲げて大きくのけぞる。`));
        assert.ok(prompt.includes('超ローアングル、強い短縮遠近法、全身'));
        assert.equal((prompt.match(/## Panel \d/g) || []).length, 4);
        for (const line of ['こちらです', 'ありがとう', '少し待って', 'これだった！', 'またどうぞ']) assert.ok(prompt.includes(line));
        assert.doesNotMatch(prompt, /題材と小道具の因果/); // Story invention belongs to STEP2, not image rendering.
      }
    }
  }
});

test('normal scenario generation specifies focal targets, reading order and relative density', () => {
  const prompt = getScenarioPrompt({
    randomCategory: '日常', targetDate: '2026-09-15', inputMode: 'manual', manualTopic: '本を返す',
    newsContext: '', searchTopicKeywords: '', customLocation: '', customOutfit: '', ragReactions: '',
    punchlineType: 'Auto', comedyTone: 'standard', styleJson: null
  });
  assert.match(prompt, /視線誘導と密度の緩急/);
  assert.match(prompt, /最優先.*視線誘導/);
  assert.match(prompt, /入口.*注視対象.*反応.*小道具.*出口/s);
  assert.match(prompt, /話の面白さ/);
  assert.match(prompt, /注視対象/);
  assert.match(prompt, /吹き出し.*右.*左/);
  assert.match(prompt, /余白/);
});

test('scenario direction separates attendance from equal prominence and removes forced visual noise', () => {
  const prompt = getScenarioPrompt({ randomCategory: '日常', targetDate: '2026-09-15', inputMode: 'manual', manualTopic: '本を返す', newsContext: '', searchTopicKeywords: '', customLocation: '', customOutfit: '', ragReactions: '', punchlineType: 'Auto', comedyTone: 'standard', styleJson: null });
  assert.doesNotMatch(prompt, /全員に役割を与え、画面を賑やかに|物理描写の書き方（全コマ必須）/);
  assert.match(prompt, /在場.*画面内の主張/);
  assert.match(prompt, /省く.*具体/);
});

test('final prompts retain setting depth, exact hand performance and explicit-only scene text', () => {
  const withPrint = scenario.replace('AがBに本を差し出す。', 'AがBに本を差し出す。表紙に「返却用」と印字されている。');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: withPrint, castList, providerFamily, colorMode, systemVersion: 'test' });
      assert.match(prompt, /depth.of.field/i);
      assert.match(prompt, /retain setting\/depth/i);
      assert.match(prompt, /no default blank backdrop/i);
      assert.doesNotMatch(prompt, /broad blank\/flat areas|not just blur|no blur|never blur|instead of blur|not blurred pixels/i);
      assert.match(prompt, /supporting (?:cast|figures).*smaller\/lower contrast/i);
      assert.match(prompt, /exact hand pose\/contact\/gaze/i);
      assert.match(prompt, /no stock-pose substitution/i);
      assert.match(prompt, /SCENE LETTERING:.*explicit.*exact/i);
      assert.match(prompt, /freely render context-appropriate lettering.*readable\/decorative.*short\/long.*any amount\/density/i);
      assert.doesNotMatch(prompt, /Action text: only scripted|include sparse|no gibberish|pseudo-lettering|unrelated text/i);
      assert.ok(prompt.includes('返却用'));
      assert.doesNotMatch(prompt, /background rich but|Do not leave plain empty walls|do not default to empty walls|rich setting/i);
    }
  }
});

test('selected visual enhancement improves rhythm without permitting unselected edits', () => {
  const prompt = buildScenarioEnhancementPrompt({ scenario, selectedCategories: ['effects'], punchlineType: 'Auto' });
  assert.match(prompt, /密度|余白/);
  assert.match(prompt, /セリフ.*(?:変更しない|変えない|保持)/);
  assert.match(prompt, /背景は未選択/);
});

test('background-only enhancement allows natural lettering without a quantity cap or hand invention', () => {
  const prompt = buildScenarioEnhancementPrompt({ scenario, selectedCategories: ['background'], punchlineType: 'Auto' });
  assert.match(prompt, /被写界深度.*ぼか/);
  assert.match(prompt, /場所.*奥行き.*保/);
  assert.doesNotMatch(prompt, /ぼかすだけでなく|広い白地や平坦な色面/);
  assert.match(prompt, /看板.*文字.*追加しない/);
  assert.match(prompt, /場所に自然な文字.*量を制限せず.*描/);
  assert.doesNotMatch(prompt, /少量|文字化け|疑似文字|架空URL/);
  assert.match(prompt, /身体.*未選択|未選択:.*身体/);
});

test('scenario generation preserves spatial background instead of making quiet beats blank', () => {
  const prompt = getScenarioPrompt({ randomCategory: '日常', targetDate: '2026-09-15', inputMode: 'manual', manualTopic: '本を返す', newsContext: '', searchTopicKeywords: '', customLocation: '', customOutfit: '', ragReactions: '', punchlineType: 'Auto', comedyTone: 'standard', styleJson: null });
  assert.match(prompt, /被写界深度.*ぼか/);
  assert.match(prompt, /場所.*奥行き.*保/);
  assert.match(prompt, /白抜き.*既定/);
  assert.doesNotMatch(prompt, /ぼかすだけでなく|どこを広い白地/);
});

test('monochrome permits depth-of-field in ink without relaxing skin or palette locks', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList, providerFamily, colorMode: 'monochrome', systemVersion: 'test' });
    assert.match(prompt, /depth.of.field[^\n]*assigned[^\n]*screentone/i);
    assert.match(prompt, /(?:lit areas of faces and skin|lit skin|light skin)[^\n]*(?:white|unprinted)/i);
    assert.match(prompt, /#000000/);
    assert.match(prompt, /#FFFFFF/);
    assert.doesNotMatch(prompt, /no blur|never blur|instead of blur|not blurred pixels/i);
  }
});

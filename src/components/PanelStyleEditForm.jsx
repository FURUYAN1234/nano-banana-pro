import React, { useEffect, useRef, useState } from 'react';

const STYLES = [
  ['NORMAL', '通常'], ['POP_ART', 'POP'], ['WATERCOLOR', '水彩'],
  ['GEKIGA', '劇画'], ['SKETCH', '線画'], ['CHIBI_GAG', 'ちび'],
];
const buttonClass = 'image-edit-action rounded-lg px-4 py-2 text-sm font-bold';
const copyStyle = { margin: '4px 0', fontSize: '12px', lineHeight: 1.45 };
const labelStyle = { display: 'inline-flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '13px', lineHeight: 1.5 };
const selectStyle = { width: 'auto', maxWidth: '100%', margin: 0, padding: '5px 8px', fontSize: '13px', lineHeight: 1.5 };
const actionStyle = { margin: 0, padding: '7px 12px', fontSize: '13px', lineHeight: 1.5 };
const validCount = value => Number.isInteger(value) && value >= 4 && value <= 8;

function PanelStyleEditControls({ image, panelCount, maxPanelCount = 8, enabled = true, busy = false, onPrepare, onGenerate, onAdopt, onDiscard }) {
  const [countChoice, setCountChoice] = useState('');
  const [prepared, setPrepared] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [edit, setEdit] = useState({ mode: 'style', style: '', instruction: '' });
  const [candidate, setCandidate] = useState(null);
  const [reviewed, setReviewed] = useState(false);
  const [pending, setPending] = useState('');
  const [error, setError] = useState('');
  const sending = useRef(false);
  const active = useRef(true);
  const discardOnUnmount = useRef(onDiscard);
  const prepareLatest = useRef(onPrepare);
  const preparedSource = useRef(null);
  useEffect(() => { prepareLatest.current = onPrepare; }, [onPrepare]);
  useEffect(() => {
    active.current = true;
    const discard = discardOnUnmount.current;
    return () => { active.current = false; discard(); };
  }, []);

  const knownCount = validCount(panelCount) && panelCount <= maxPanelCount;
  const count = knownCount ? panelCount : Number(countChoice);
  useEffect(() => {
    if (!enabled || busy || !validCount(count) || count > maxPanelCount) return;
    if (preparedSource.current?.image === image && preparedSource.current.count === count) return;
    let cancelled = false;
    preparedSource.current = null;
    setPrepared(null);
    setSelectedIndex(null);
    setCandidate(null);
    setReviewed(false);
    setError('');
    setPending('prepare');
    void (async () => {
      try {
        const result = await prepareLatest.current({ sourceImage: image, panelCount: count });
        if (cancelled || !active.current) return;
        if (result?.sourceImage !== image || !result.frames?.length) throw new Error('コマを読み込めませんでした。元画像はそのままです。');
        preparedSource.current = { image, count };
        setPrepared(result);
      } catch (failure) {
        if (!cancelled && active.current) setError(failure?.message || 'コマを読み込めませんでした。元画像はそのままです。');
      } finally {
        if (!cancelled && active.current) setPending('');
      }
    })();
    return () => { cancelled = true; };
  }, [count, maxPanelCount, enabled, image, busy]);
  const frame = prepared?.frames.find(item => item.index === selectedIndex);
  const frameLabel = (item, position) => prepared?.readingOrderConfirmed && Number.isInteger(item.panelNumber)
    ? `${item.panelNumber}コマ目` : `範囲${position + 1}（順番未確認）`;
  const selectedLabel = frame && frameLabel(frame, prepared.frames.indexOf(frame));
  const targetLabel = prepared?.readingOrderConfirmed && frame && Number.isInteger(frame.panelNumber)
    ? `${frame.panelNumber}コマ目` : '選んだ範囲';
  const { mode, style, instruction } = edit;
  const trimmedInstruction = instruction.trim();
  const styleLabel = STYLES.find(item => item[0] === style)?.[1];
  const locked = busy || Boolean(pending);
  const validEdit = mode === 'style' ? Boolean(styleLabel) : mode === 'free' && Boolean(trimmedInstruction);
  const canGenerate = prepared?.sourceImage === image && frame && validEdit && !candidate;
  const run = async (phase, action) => {
    if (busy || sending.current || !active.current) return;
    sending.current = true;
    setPending(phase);
    setError('');
    try { await action(); }
    catch (failure) { if (active.current) setError(failure?.message || '処理できませんでした。元画像はそのままです。'); }
    finally {
      sending.current = false;
      if (active.current) setPending('');
    }
  };

  return (
    <div className="w-full text-left" style={{ width: '100%', fontSize: '13px', lineHeight: 1.5 }}>
      <div>
        {!prepared && <>
          {knownCount ? <p style={copyStyle} className="text-xs text-slate-400">この画像：{panelCount}コマ</p> : (
            <label style={labelStyle} className="block text-sm">この画像のコマ数
              <select aria-label="この画像のコマ数" value={countChoice} disabled={locked}
                onChange={event => setCountChoice(event.target.value)} style={selectStyle} className="ml-2 rounded border border-white/20 bg-slate-900 p-2">
                <option value="">選択してください</option>
                {[4, 5, 6, 7, 8].filter(value => value <= maxPanelCount).map(value => <option key={value} value={value}>{value}コマ</option>)}
              </select>
            </label>
          )}
        </>}

        {prepared && !candidate && <>
          <p style={copyStyle} className="text-xs text-slate-300">選んだコマだけを修正します。元画像は採用まで保持します。</p>
          {!prepared.readingOrderConfirmed && <p style={{ ...copyStyle, color: '#fde68a' }} className="text-xs text-amber-200">{prepared.readingOrderNote || 'コマの順番を確認できませんでした。画像で修正する範囲を選んでください。'}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
            {prepared.frames.map((item, position) => (
              <button key={item.index} type="button" disabled={locked} aria-pressed={selectedIndex === item.index}
                onClick={() => setSelectedIndex(item.index)}
                style={{ margin: 0, padding: '6px', fontSize: '12px', lineHeight: 1.4, color: '#e2e8f0', borderRadius: '8px', border: selectedIndex === item.index ? '2px solid #60a5fa' : '1px solid #475569', background: selectedIndex === item.index ? 'rgba(59,130,246,0.2)' : 'transparent' }}
                className={`rounded-lg border p-2 text-xs disabled:opacity-40 ${selectedIndex === item.index ? 'border-blue-400 bg-blue-500/20' : 'border-white/20'}`}>
                <img src={item.thumbnail} alt={`${frameLabel(item, position)}の画像`} style={{ width: '100%', height: '110px', objectFit: 'contain' }} />
                <span>{frameLabel(item, position)}</span>
              </button>
            ))}
          </div>
          {frame && <>
          <figure style={{ margin: '8px 0 6px', padding: '6px', border: '1px solid #475569', borderRadius: '8px' }} className="rounded-lg border border-white/15 p-3">
            <img src={frame.thumbnail} alt="修正対象のプレビュー" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }} />
            <figcaption style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: 1.5, textAlign: 'center' }} className="mt-2 text-center text-sm">修正対象：{selectedLabel}</figcaption>
          </figure>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', alignItems: 'center', margin: '6px 0' }}>
          <label style={labelStyle} className="block text-sm">修正方法
            <select aria-label="修正方法" value={mode} disabled={locked}
              onChange={event => setEdit({ ...edit, mode: event.target.value })} style={selectStyle} className="ml-2 rounded border border-white/20 bg-slate-900 p-2">
              <option value="style">絵柄</option>
              <option value="free">自由入力</option>
            </select>
          </label>
          {mode === 'style' && <label style={labelStyle} className="block text-sm">変更後の絵柄
            <select aria-label="変更後の絵柄" value={style} disabled={locked}
              onChange={event => setEdit({ ...edit, style: event.target.value })} style={selectStyle} className="ml-2 rounded border border-white/20 bg-slate-900 p-2">
              <option value="">選択してください</option>
              {STYLES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>}
          </div>
          {mode === 'free' && <label style={{ display: 'block', margin: '6px 0', fontSize: '13px', lineHeight: 1.5 }} className="block text-sm">選んだコマへの指示
            <textarea aria-label="選んだコマへの指示" value={instruction} disabled={locked} rows={6}
              onChange={event => setEdit({ ...edit, instruction: event.target.value })}
              placeholder="選んだコマの中で、変更したい箇所と内容を入力してください。"
              style={{ display: 'block', width: '100%', minHeight: '9em', margin: '4px 0 0', boxSizing: 'border-box', padding: '8px', fontSize: '14px', lineHeight: 1.5, resize: 'vertical', borderRadius: '6px' }}
              className="mt-2 block w-full rounded border border-white/20 bg-slate-900 p-2" />
          </label>}
          <button type="button" style={{ ...actionStyle, width: '100%' }} className={`${buttonClass} w-full`} disabled={locked || !canGenerate} onClick={() => {
            if (!canGenerate) return;
            return run('generate', async () => {
              const result = await onGenerate({ sourceImage: image, panelIndex: frame.index, region: frame.region, mode,
                ...(mode === 'style' ? { style } : { instruction: trimmedInstruction }) });
              if (!active.current) return;
              if (!result) throw new Error('修正候補を作成できませんでした。処理状況を確認してください。元画像はそのままです。');
              const matchesEdit = result.mode === mode && (mode === 'style' ? result.style === style : result.instruction === trimmedInstruction);
              const matchesRegion = ['x', 'y', 'width', 'height'].every(key => result.region?.[key] === frame.region[key]);
              if (result.sourceImage !== image || result.panelIndex !== frame.index || !matchesEdit || !matchesRegion || !result.before || !result.after || !result.image) {
                await onDiscard();
                throw new Error('現在の選択と修正候補が一致しません。元画像はそのままです。');
              }
              setCandidate(result);
              setReviewed(false);
            });
          }}>{targetLabel}を修正（追加課金あり）</button>
          </>}
        </>}

        {candidate && <>
          <p style={{ ...copyStyle, fontWeight: 700 }} className="text-sm font-bold text-blue-200">修正候補を比較してください（まだ採用していません）</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
            {[[candidate.before, '元のコマ'], [candidate.after, '修正候補']].map(([src, label]) => <figure key={label} style={{ margin: 0 }}>
              <figcaption style={{ ...copyStyle, textAlign: 'center' }} className="mb-2 text-center text-sm">{label}</figcaption>
              <img src={src} alt={label} style={{ width: '100%', height: 'auto' }} />
            </figure>)}
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '8px 0', fontSize: '13px', lineHeight: 1.5 }} className="flex items-start gap-2 text-sm">
            <input type="checkbox" aria-label="修正候補の目視確認" checked={reviewed} disabled={locked}
              onChange={event => setReviewed(event.target.checked)} className="mt-1" />
            <span>指定した修正、顔・髪・服の絵柄、人物の同一性・台詞・カメラ・演技、周囲とのつながりを目視で確認しました。</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} className="flex flex-wrap gap-2">
            <button type="button" style={actionStyle} className={buttonClass} disabled={locked || !reviewed} onClick={() => {
              if (!reviewed || candidate.sourceImage !== image) return;
              return run('adopt', async () => {
                const adopted = await onAdopt({ candidate, reviewConfirmed: true });
                if (!active.current) return;
                if (!adopted) throw new Error('候補を採用できませんでした。元画像と処理状況を確認してください。');
                setCandidate(null);
                setReviewed(false);
              });
            }}>この候補を採用</button>
            <button type="button" style={actionStyle} className={buttonClass} disabled={locked} onClick={() => run('discard', async () => {
              await onDiscard();
              if (!active.current) return;
              setCandidate(null);
              setReviewed(false);
            })}>候補を破棄して元画像を保つ</button>
          </div>
        </>}
        {pending && <p style={copyStyle} className="text-xs text-blue-200" aria-live="polite">{pending === 'prepare' ? 'コマを読み込み中…' : pending === 'generate' ? '修正候補を生成中…' : '処理中…'}</p>}
        {error && <p role="alert" style={{ ...copyStyle, color: '#fca5a5' }} className="text-xs text-red-300">{error}</p>}
      </div>
    </div>
  );
}

export default function PanelStyleEditForm(props) {
  if (!props.image || !props.onPrepare || !props.onGenerate || !props.onAdopt || !props.onDiscard) return null;
  return <PanelStyleEditControls key={props.image} {...props} />;
}

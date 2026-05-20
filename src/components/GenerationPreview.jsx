import React from 'react';
import { Sparkles, Globe } from 'lucide-react';

export default function GenerationPreview({
  scenario,
  bg360Image,
  bg360Analysis,
  bg360Enabled,
  customLocation,
  customOutfit,
  punchlineType,
  getPunchlineLabel
}) {
  return (
    <div className={`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
      ${!scenario ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
    `}>
      <span className="text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2">
        <Sparkles size={14} /> {bg360Image ? '背景・服装・オチ設定' : '場所・服装・オチ設定'} (GENERATION PREVIEW)
      </span>
      <p className="text-[10px] text-slate-400 leading-relaxed">
        ※以下はシナリオ内の <code className="text-blue-300">Location:</code> / <code className="text-purple-300">Outfit:</code> / <code className="text-yellow-300">Punchline:</code> 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。
      </p>
      {(() => {
        const previewLocation = scenario?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
        const previewOutfit = scenario?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
        const previewPunchline = scenario?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
        const has360Bg = !!bg360Image && !!bg360Analysis && bg360Enabled;
        const locationLabel = has360Bg ? '背景 (Background)' : '場所 (Location)';
        const locationValue = has360Bg
          ? (previewLocation || bg360Analysis?.location || '360°画像')
          : (previewLocation || (customLocation.trim() || "AIおまかせ"));
        const locationBadge = has360Bg ? '画像解析' : (customLocation.trim() ? '手入力' : 'AIおまかせ');
        const locationColor = has360Bg ? '#67e8f9' : (customLocation.trim() ? '#ffffff' : '#93c5fd');
        const badgeBg = has360Bg ? 'rgba(6,182,212,0.3)' : (customLocation.trim() ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)');
        const badgeColor = has360Bg ? '#67e8f9' : (customLocation.trim() ? '#d1d5db' : '#93c5fd');
        const badgeBorder = has360Bg ? 'rgba(6,182,212,0.4)' : (customLocation.trim() ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)');
        return (<>
          <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            {has360Bg ? <Globe size={12} className="text-cyan-400" /> : <Globe size={12} className="text-blue-400" />}
            <span>{locationLabel}:</span>
            <span style={{ fontWeight: 'bold', color: locationColor }}>
              {locationValue}
            </span>
            <span style={{
              marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
              background: badgeBg,
              color: badgeColor,
              border: `1px solid ${badgeBorder}`
            }}>
              {locationBadge}
            </span>
          </div>
          <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <span className="text-green-400">👕</span>
            <span>服装 (Outfit):</span>
            <span style={{ fontWeight: 'bold', color: customOutfit.trim() ? '#ffffff' : '#93c5fd' }}>
              {previewOutfit || (customOutfit.trim() || "AIおまかせ")}
            </span>
            <span style={{
              marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
              background: customOutfit.trim() ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)',
              color: customOutfit.trim() ? '#d1d5db' : '#93c5fd',
              border: `1px solid ${customOutfit.trim() ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)'}`
            }}>
              {customOutfit.trim() ? '手入力' : 'AIおまかせ'}
            </span>
          </div>
          <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', paddingBottom: '4px' }}>
            <span className="text-yellow-400">🎬</span>
            <span>オチ (Punchline):</span>
            <span style={{ fontWeight: 'bold', color: previewPunchline || punchlineType !== 'Auto' ? '#ffffff' : '#93c5fd' }}>
              {previewPunchline || (punchlineType === 'Auto' ? "AIおまかせ" : getPunchlineLabel(punchlineType))}
            </span>
            <span style={{
              marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
              background: punchlineType !== 'Auto' ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)',
              color: punchlineType !== 'Auto' ? '#d1d5db' : '#93c5fd',
              border: `1px solid ${punchlineType !== 'Auto' ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)'}`
            }}>
              {punchlineType !== 'Auto' ? '強制指定' : 'AIおまかせ'}
            </span>
          </div>
        </>);
      })()}
    </div>
  );
}

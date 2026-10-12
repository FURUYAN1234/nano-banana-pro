export default function ExperimentalMangaPanel({children,enabled,onModeChange,normalBusy,currentStep=1,isAnalyzing=false,isSearching=false}) {
  if (currentStep < 3 || isAnalyzing || isSearching) return null;
  return <><section aria-label="実験的コマ割り" style={{border:'1px solid #64748b',borderRadius:12,padding:'12px 14px',background:'#111827',marginTop:12,lineHeight:1.55}}>
    <button type="button" role="switch" aria-checked={enabled} aria-label="実験的コマ割り" aria-controls="experimental-manga-description" disabled={normalBusy} onClick={()=>onModeChange(!enabled)} style={{display:'flex',alignItems:'center',gap:12,color:'#fff',background:'transparent',border:0,fontSize:16,cursor:normalBusy?'not-allowed':'pointer'}}>
      <span aria-hidden="true" style={{display:'inline-flex',alignItems:'center',width:44,height:24,borderRadius:12,background:enabled?'#059669':'#475569',padding:3}}><span style={{display:'block',width:18,height:18,borderRadius:9,background:'#fff',marginLeft:enabled?20:0}} /></span>
      実験的コマ割り <strong>{enabled?'ON':'OFF'}</strong>
    </button>
    <div id="experimental-manga-description" style={{color:'#cbd5e1',fontSize:11.5}}>
    {!enabled ? <p style={{margin:'6px 0'}}>ONにすると元の4コマ台本をもとに、AIが内容に合う5〜8コマと配置を選びます。</p> : <>
    <p style={{margin:'6px 0'}}>元の4コマ台本をもとに、AIが内容に合う5〜8コマと配置を選びます。左右2列、横長と分割の組み合わせ、上・下の大きな見せ場、縦のぶち抜きなどを使い分け、身体の枠越えも必要な場面で試します。読む順番は右→左・上→下を保ちます。</p>
    <p style={{margin:'4px 0'}}>手前と奥の対比、斜めのコマ枠、動作のつながり、動きの軌跡、輪郭の光、無言の間、シルエット、余白や背景の勢いも、場面に合うものを選びます。元のカメラ・画風・台詞を保ち、すべての演出を毎回使うわけではありません。</p>
    <div>
      <p style={{margin:0}}><strong>OFF：</strong>従来の4コマ用プロンプトを使います。</p>
      <p style={{margin:0}}><strong>ON：</strong>次のSTEP3で、可変コマ割り用プロンプトを別に作ります。</p>
      <p style={{margin:0}}><strong>OFFへ戻す：</strong>保存していた4コマ用プロンプトへ戻ります。</p>
      <p style={{margin:'4px 0 0',color:'#fde68a'}}>コマ割り・読む順番・カメラや画風などの生成結果が乱れる場合は、OFFに戻して従来の4コマをご利用ください。</p>
    </div>
    </>}
    </div>
    </section>
    {children}
  </>;
}

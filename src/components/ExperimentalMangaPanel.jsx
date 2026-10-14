export default function ExperimentalMangaPanel({enabled,onModeChange,normalBusy,currentStep=1,isAnalyzing=false,isSearching=false}) {
  if (currentStep < 2 || isAnalyzing || isSearching) return null;
  return <section aria-label="漫画のコマ数" style={{border:'1px solid #64748b',borderRadius:12,padding:'12px 14px',background:'#111827',marginTop:12,lineHeight:1.55}}>
    <button type="button" role="switch" aria-checked={enabled} aria-label="コマ数切り替え" aria-controls="experimental-manga-description" aria-describedby="experimental-manga-description" disabled={normalBusy} onClick={()=>onModeChange(!enabled)} className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" style={{display:'flex',alignItems:'center',gap:12,minHeight:44,color:'#fff',background:'transparent',border:0,fontSize:16,cursor:normalBusy?'not-allowed':'pointer'}}>
      <span aria-hidden="true" className="motion-safe:transition-colors motion-safe:duration-150" style={{position:'relative',display:'block',flexShrink:0,width:48,height:28,borderRadius:14,background:enabled?'#059669':'#38bdf8',boxShadow:'inset 0 0 0 1px #94a3b8'}}><span className="motion-safe:transition-transform motion-safe:duration-150" style={{position:'absolute',display:'block',top:4,left:4,width:20,height:20,borderRadius:'50%',background:'#fff',boxShadow:'0 0 0 1px #075985',transform:enabled?'translateX(20px)':'translateX(0px)'}} /></span>
      <strong>{enabled?'5～8コマ生成':'4コマ生成'}</strong>
    </button>
    <div id="experimental-manga-description" style={{color:'#cbd5e1',fontSize:11.5}}>
    {!enabled ? <p style={{margin:'6px 0'}}>スイッチが左のときは「4コマ生成」です。右に切り替えると「5～8コマ生成」になり、最初から5～8コマのシナリオを作成して、内容に合ったコマ配置で漫画にします。</p> : <>
    <p style={{margin:'6px 0'}}>スイッチが右のときは「5～8コマ生成」です。最初から5～8コマのシナリオを作成し、内容に合ったコマ配置で漫画にします。左右2列、横長と分割の組み合わせ、上・下の大きな見せ場、縦のぶち抜きなどを使い分け、身体の枠越えも必要な場面で試します。読む順番は右→左・上→下を保ちます。</p>
    <p style={{margin:'4px 0'}}>手前と奥の対比、斜めのコマ枠、動作のつながり、動きの軌跡、輪郭の光、無言の間、シルエット、余白や背景の勢いも、場面に合うものを選びます。シナリオのコマ数・順序・カメラ・画風・台詞を保ち、すべての演出を毎回使うわけではありません。</p>
    <div>
      <p style={{margin:0}}><strong>左・4コマ生成：</strong>STEP2で従来の4コマシナリオを作ります。</p>
      <p style={{margin:0}}><strong>右・5～8コマ生成：</strong>STEP2で5～8コマを作り、STEP3でそのままのコマ数・順序の画像用プロンプトに変換します。</p>
      <p style={{margin:0}}><strong>左の4コマ生成へ戻す：</strong>作成済みの4コマの台本と生成結果へ戻ります。5～8コマの内容も保持します。</p>
      <p style={{margin:'4px 0 0',color:'#fde68a'}}>コマ割り・読む順番・カメラや画風などの生成結果が乱れる場合は、左の「4コマ生成」に戻してご利用ください。</p>
    </div>
    </>}
    </div>
    </section>
  ;
}

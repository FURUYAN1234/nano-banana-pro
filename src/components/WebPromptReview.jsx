import React from 'react';
import { buildComedyReviewRequest, applyComedyReview } from '../lib/comedy-review';
import { callAI } from '../lib/ai-provider';

export default function WebPromptReview({ prompt, onChange, busy, scenario, castList }) {
  const [review, setReview] = React.useState(null);
  const [reviewing, setReviewing] = React.useState(false);
  const latest = React.useRef({ prompt, scenario, castList, busy });
  latest.current = { prompt, scenario, castList, busy };
  const current = review && (prompt === review.prompt || prompt === review.original);
  const apply = async () => {
    if (reviewing) return;
    setReviewing(true);
    let result;
    try {
      const response = await callAI(buildComedyReviewRequest({ prompt, scenario, castList }), null, null, () => {});
      result = applyComedyReview(prompt, response.text);
    } catch {
      result = { prompt, changes: [], observations: [], warning: 'AI精査を取得できなかったため、元の指示文を保持しました。コピー・生成は続けられます。' };
    } finally {
      setReviewing(false);
    }
    if (latest.current.prompt !== prompt || latest.current.scenario !== scenario || latest.current.castList !== castList || latest.current.busy) return;
    setReview({ ...result, original: prompt });
    onChange(result.prompt);
  };
  return <div className="my-3 text-sm text-slate-300">
    <button type="button" onClick={apply} disabled={busy || reviewing || !prompt || (current && prompt === review.prompt && prompt !== review.original)} className="px-3 py-2 border border-slate-500 rounded">{reviewing ? 'ギャグの意図をAI精査中…' : 'ギャグを保ってAI精査'}</button>
    <p>任意の文章API精査（追加料金・待ち時間あり）。シュールさや意図が曖昧な破綻は残し、明確に競合する補助指示だけを調整します。精査中も元の本文をコピー・生成できます。</p>
    {current && <details open>
      <summary>変更内容とコマ別の確認</summary>
      {review.warning && <p role="status">{review.warning}</p>}
      <ul>{review.changes.map((change, i) => <li key={i}>{change}</li>)}</ul>
      {!review.warning && review.changes.length === 0 && <p>修正が必要と判断された補助指示はありません。原文を保持しました。</p>}
      {review.patches?.map((patch, i) => <details key={i} className="my-2">
        <summary>修正{i + 1}の前後を表示</summary>
        <p className="break-words">変更前：{patch.before}</p>
        <p className="break-words">変更後：{patch.after}</p>
      </details>)}
      {review.observations.map((item, i) => <p key={i}>{item.panel}コマ目：{item.reason}</p>)}
      <p>AIの解釈は誤る場合があります。脚本・台詞そのものは書き換えません。</p>
      <button type="button" disabled={busy || prompt === review.original} onClick={() => onChange(review.original)} className="px-3 py-2 border border-slate-500 rounded">精査前の指示文に戻す</button>
    </details>}
  </div>;
}

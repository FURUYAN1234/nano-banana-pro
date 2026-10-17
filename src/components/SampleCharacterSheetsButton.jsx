import React from 'react';
import { loadSampleCharacterSheets } from '../lib/sample-character-sheets.js';

export default function SampleCharacterSheetsButton({ processFiles, disabled = false }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleClick = async () => {
    if (loading || disabled) return;
    setLoading(true);
    setError('');
    try {
      const files = await loadSampleCharacterSheets({ baseUrl: import.meta.env.BASE_URL });
      await processFiles(files);
    } catch (cause) {
      setError(cause?.message || 'サンプルキャラシートを読み込めませんでした。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full -mb-2 flex flex-col items-center gap-2 text-center">
      <button type="button" onClick={handleClick} disabled={disabled || loading}
        className="sample-character-sheets-button">
        {loading ? 'サンプルキャラシートを読み込み中…' : 'サンプルキャラシート２枚を読み込む'}
      </button>
      <p className="sample-character-sheets-note">自分のキャラシートを使う場合は不要です。</p>
      {error && <p role="alert" className="text-xs text-amber-300">{error}</p>}
    </div>
  );
}

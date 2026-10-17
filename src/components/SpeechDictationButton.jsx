import React from 'react';
import { Mic, Square } from 'lucide-react';
import { transcribeStep2Audio } from '../lib/audio-transcription.js';

const MAX_RECORDING_MS = 60_000;
const RECORDER_MIME_TYPES = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];

const stopTracks = stream => stream?.getTracks().forEach(track => track.stop());

export default function SpeechDictationButton({ provider, onText, disabled = false }) {
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState('');
  const recorderRef = React.useRef(null);
  const streamRef = React.useRef(null);
  const timerRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const mountedRef = React.useRef(false);
  const cancelledRef = React.useRef(false);
  const providerRef = React.useRef(provider);
  const supported = typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia)
    && typeof MediaRecorder !== 'undefined' && typeof MediaRecorder.isTypeSupported === 'function';

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelledRef.current = true;
      clearTimeout(timerRef.current);
      requestRef.current?.abort();
      if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
      stopTracks(streamRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!disabled) return;
    cancelledRef.current = true;
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    requestRef.current?.abort();
    stopTracks(streamRef.current);
  }, [disabled]);

  React.useEffect(() => {
    if (providerRef.current === provider) return;
    providerRef.current = provider;
    cancelledRef.current = true;
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    requestRef.current?.abort();
    stopTracks(streamRef.current);
  }, [provider]);

  const startRecording = async () => {
    setError('');
    setStatus('requesting');
    cancelledRef.current = false;
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current || cancelledRef.current) {
        stopTracks(stream);
        if (mountedRef.current) setStatus('idle');
        return;
      }
      streamRef.current = stream;
      const mimeType = RECORDER_MIME_TYPES.find(type => MediaRecorder.isTypeSupported(type));
      if (!mimeType) throw new Error('このブラウザーの録音形式には対応していません。');
      const recorder = new MediaRecorder(stream, { mimeType });
      recorderRef.current = recorder;
      const chunks = [];
      recorder.ondataavailable = event => {
        if (event.data?.size) chunks.push(event.data);
      };
      recorder.onerror = () => {
        cancelledRef.current = true;
        stopTracks(stream);
        if (mountedRef.current) {
          setError('録音に失敗しました。');
          setStatus('idle');
        }
      };
      recorder.onstop = async () => {
        clearTimeout(timerRef.current);
        stopTracks(stream);
        streamRef.current = null;
        recorderRef.current = null;
        if (!mountedRef.current || cancelledRef.current) {
          if (mountedRef.current) setStatus('idle');
          return;
        }
        const request = new AbortController();
        requestRef.current = request;
        setStatus('transcribing');
        try {
          const blob = new Blob(chunks, { type: recorder.mimeType });
          const text = await transcribeStep2Audio(blob, provider, request.signal);
          if (mountedRef.current && !cancelledRef.current) onText(text);
        } catch (cause) {
          if (mountedRef.current && !cancelledRef.current) {
            setError(cause?.message || '文字起こしに失敗しました。');
          }
        } finally {
          requestRef.current = null;
          if (mountedRef.current) setStatus('idle');
        }
      };
      recorder.start();
      setStatus('recording');
      timerRef.current = setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, MAX_RECORDING_MS);
    } catch (cause) {
      stopTracks(stream);
      if (mountedRef.current) {
        setError(cause?.name === 'NotAllowedError'
          ? 'マイクの使用が許可されていません。'
          : cause?.message || '録音を開始できませんでした。');
        setStatus('idle');
      }
    }
  };

  const recording = status === 'recording';
  const statusText = !supported
    ? 'このブラウザーは録音に対応していません。'
    : error || (status === 'requesting'
      ? 'マイクを準備中…'
      : recording
        ? '録音中…（最大60秒）'
        : status === 'transcribing'
          ? `${provider === 'openai' ? 'OpenAI' : 'Gemini'}で文字起こし中…`
          : '');

  return (
    <div className="speech-dictation-control">
      {statusText && <span role="status" className="speech-dictation-status">{statusText}</span>}
      <button
        type="button"
        onClick={() => {
          if (recording) {
            setStatus('transcribing');
            recorderRef.current?.stop();
          } else {
            startRecording();
          }
        }}
        disabled={!supported || disabled || status === 'requesting' || status === 'transcribing'}
        aria-pressed={recording}
        aria-label={recording ? '録音を停止して文字起こし' : '音声入力を開始'}
        className="speech-dictation-button"
      >
        {recording ? <Square size={15} /> : <Mic size={16} />}
        {recording ? '録音を停止' : '音声入力'}
      </button>
    </div>
  );
}

import React from 'react';
import { createPortal } from 'react-dom';
import { MCP_OPERATION_LABELS } from '../lib/mcp/operation-labels.js';

export default function McpConnectionControls({status,claimed,canConnect,onConnect,onDisconnect}) {
  if(typeof document==='undefined')return null;
  const label=status.error?(claimed?'MCP 接続を確認':'MCP停止済み・接続確認なし'):status.connected?status.busy
    ? `MCP｜${MCP_OPERATION_LABELS[status.operation]||'AI操作中'}${status.pageIndex?`・${status.pageIndex}ページ`:''}`:'MCP 接続済み':'MCP 接続待ち';
  return createPortal(<aside className={`mcp-controls-corner ${claimed?'mcp-controls-claimed':'mcp-controls-unclaimed'}`} aria-label="ローカルMCP接続">
    <span className={`mcp-corner-status ${status.connected&&!status.error?'mcp-corner-connected':''}`} role="status" title={status.error||label}>{label}</span>
    {claimed?<button type="button" className="mcp-corner-button mcp-corner-disconnect" onClick={onDisconnect}>停止して手動に戻る</button>
      :canConnect||status.connecting?<button type="button" className="mcp-corner-button" disabled={!canConnect||status.connecting} onClick={onConnect}>AI操作を許可</button>:null}
  </aside>,document.body);
}

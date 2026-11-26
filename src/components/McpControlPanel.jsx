import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createMangaBridgeClient } from '../lib/mcp/browser-client.js';

import McpConnectionControls from './McpConnectionControls.jsx';
export default function McpControlPanel({ execute, cancel, operations, capture, restore, onConnectionChange }) {
  const handlers = useRef({ execute, cancel, capture, restore });
  // A parent workflow commit fence can resume the book loop before passive
  // effects run. Publish this render's handlers in the same commit so the next
  // invoke cannot route a comic page through the previous cover's closure.
  useLayoutEffect(() => { handlers.current = { execute, cancel, capture, restore }; }, [execute, cancel, capture, restore]);
  const client = useRef(null);
  const backup = useRef(null);
  const [status, setStatus] = useState({ connected: false });
  const [claimed,setClaimed]=useState(false);
  const [pairingToken, setPairingToken] = useState(() => new URLSearchParams(window.location.hash.slice(1)).get('mcp'));
  const connecting = useRef(false);
  const consumed = useRef(new Set());
  const disconnecting=useRef(null);
  const disconnect=useCallback(()=>{
    if(disconnecting.current)return disconnecting.current;
    disconnecting.current=(async()=>{
      try {
        const disconnected = await client.current?.disconnect();
        const warnings = disconnected?.warning ? [disconnected.warning] : [];
        await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)));

        const snapshot = backup.current;
        backup.current = null;
        client.current = null;
        if (snapshot) {
          try {
            handlers.current.restore(snapshot);
          } catch (error) {
            warnings.push(`切断前の画面を復元できませんでした: ${error.message}`);
          }
        }

        const nextStatus = { connected: false, ...(warnings.length ? { error: warnings.join(' ') } : {}) };
        setClaimed(false);
        setStatus(nextStatus);
        onConnectionChange?.({ ...nextStatus, claimed: false });
      }
      catch(error){setStatus({connected:true,error:error.message});throw error;}
      finally{disconnecting.current=null;}
    })();
    return disconnecting.current;
  },[onConnectionChange]);
  useEffect(() => {
    const change = () => {
      const next = new URLSearchParams(window.location.hash.slice(1)).get('mcp');
      if (next && !consumed.current.has(next)) setPairingToken(next);
    };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => () => { void client.current?.disconnect().catch(() => {}); }, []);
  if (!pairingToken && !status.connected && !status.error) return null;
  const connect = async () => {
    if (connecting.current || !pairingToken || consumed.current.has(pairingToken)) return;
    connecting.current = true; setStatus({ connected: false, connecting: true });
    const newBackup=backup.current===null;
    try {
      await client.current?.disconnect();
      backup.current??=handlers.current.capture();
      setClaimed(true);
      client.current = createMangaBridgeClient({ origin: window.location.origin,
        execute: (job, context) => {
          const current={...context,invoke:subJob=>handlers.current.execute(subJob,current)};
          return handlers.current.execute(job,current);
        }, cancel: () => handlers.current.cancel(), onStatus: value=>{setStatus(value);onConnectionChange?.({...value,claimed:backup.current!==null});} });
      await client.current.connect(pairingToken, operations);
      consumed.current.add(pairingToken); setPairingToken(null);
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (error) {if(newBackup){backup.current=null;setClaimed(false);}setStatus({ connected: false, error: error.message });onConnectionChange?.({connected:false,claimed:backup.current!==null,error:error.message});}
    finally { connecting.current = false; }
  };
  return <McpConnectionControls status={status} claimed={claimed} canConnect={Boolean(pairingToken)} onConnect={connect} onDisconnect={()=>{void disconnect().catch(()=>{});}} />;
}

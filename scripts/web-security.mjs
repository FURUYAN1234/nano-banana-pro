import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Copied into each standalone app; no workspace dependency at build/runtime.
const frameGuard = `if(window.top===window.self){document.getElementById('app-frame-guard').remove();}`;
export function secureHtml(html, { connectSources = [], development = false } = {}) {
  if ([...html.matchAll(/<head\b[^>]*>/gi)].length !== 1) throw new Error('Exactly one HTML head is required');
  if (/http-equiv=["']Content-Security-Policy/i.test(html)) throw new Error('Duplicate CSP');
  if (/\son[a-z]+\s*=/i.test(html) || /(?:href|src)\s*=\s*["']javascript:/i.test(html)) {
    throw new Error('Inline event handlers and javascript URLs are forbidden');
  }
  for (const source of connectSources) {
    if (source !== 'https:' && !/^https:\/\/(?:\*\.)?[a-z0-9.-]+(?::\d+)?$/i.test(source)) {
      throw new Error('Invalid connection source');
    }
  }
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\bsrc\s*=/i.test(match[1])).map((match) => match[2]);
  scripts.push(frameGuard);
  const hashes = [...new Set(scripts.map((script) => `'sha256-${createHash('sha256').update(script).digest('base64')}'`))];
  const connections = ["'self'", 'blob:', 'data:', ...connectSources,
    ...(development ? ['ws://127.0.0.1:*', 'ws://localhost:*'] : [])];
  const policy = [
    "default-src 'none'",
    `script-src 'self' ${hashes.join(' ')}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src ${[...new Set(connections)].join(' ')}`,
    "media-src 'self' data: blob: https:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'",
  ].join('; ');
  // Pages cannot set frame-ancestors/X-Frame-Options: keep framed UI hidden,
  // including sandboxed frames where scripts are disabled. Local servers also
  // send X-Frame-Options. This fallback is not a substitute for an HTTP CSP.
  const head = `<meta http-equiv="Content-Security-Policy" content="${policy}">\n<meta name="referrer" content="no-referrer">\n<style id="app-frame-guard">html{display:none!important}</style>\n<script>${frameGuard}</script>`;
  return html.replace(/(<head\b[^>]*>\s*(?:<meta\s+charset=[^>]+>\s*)?)/i, `$1${head}\n`);
}

export function verifyBuiltSecurity(html) {
  const policy = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/)?.[1];
  if (!policy) throw new Error('Built CSP missing');
  for (const directive of ["default-src 'none'", "script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-src 'none'"]) {
    if (!policy.split('; ').includes(directive)) throw new Error(`Built CSP missing ${directive}`);
  }
  const scriptPolicy = policy.split('; ').find(value => value.startsWith('script-src '));
  if (!scriptPolicy?.startsWith("script-src 'self' ") || /unsafe-|https:|http:|blob:|data:|\*/.test(scriptPolicy)) throw new Error('Unsafe built script policy');
  if (!html.includes('<meta name="referrer" content="no-referrer">') || !html.includes(frameGuard) || !html.includes('html{display:none!important}')) throw new Error('Built privacy/frame guard missing');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/i.test(match[1])) continue;
    const hash = `'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`;
    if (!scriptPolicy.includes(hash)) throw new Error('Built inline script hash mismatch');
  }
  return true;
}

export function webSecurity(options = {}) {
  let development = false;
  const headers = (server) => { server.middlewares.use((_req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  }); };
  return {
    name: 'app-web-security',
    configResolved(config) { development = config.command === 'serve' && !config.isPreview; },
    configureServer: headers,
    configurePreviewServer: headers,
    transformIndexHtml: { order: 'post', handler: (html) => secureHtml(html, { ...options, development }) },
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href && process.argv[2] === '--verify-dist') {
  verifyBuiltSecurity(readFileSync('dist/index.html', 'utf8'));
  console.log('BUILT_WEB_SECURITY_VERIFIED');
}

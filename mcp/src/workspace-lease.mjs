import net from 'node:net';
import { createHash } from 'node:crypto';
import { MangaControlError } from '../../src/lib/mcp/contract.js';

// The OS owns this lease. No time-based takeover or stale-lock unlink can run
// beside a live owner; process termination releases it even after a crash.
export async function acquireWorkspaceLease(realWorkspace) {
  const canonical = process.platform === 'win32' ? realWorkspace.replaceAll('/', '\\').replace(/\\+$/, '').toLowerCase() : realWorkspace.replace(/\/+$/, '');
  const digest = createHash('sha256').update(canonical).digest('hex');
  const address = process.platform === 'win32' ? `\\\\.\\pipe\\super-furu-manga-${digest}`
    : process.platform === 'linux' ? `\0super-furu-manga-${digest}` : null;
  if (!address) throw new MangaControlError('UNSUPPORTED_LEASE_PLATFORM', 'This local server currently supports Windows and Linux workspace leases.');
  const server = net.createServer(socket => socket.destroy());
  await new Promise((resolve, reject) => {
    server.once('error', error => reject(new MangaControlError('WORKSPACE_BUSY', `Cannot acquire this workspace’s exclusive OS lease (${error.code}); another server may already own it. No job was dispatched.`)));
    server.listen({ path: address, exclusive: true }, resolve);
  });
  return { close: () => new Promise(resolve => server.close(resolve)) };
}

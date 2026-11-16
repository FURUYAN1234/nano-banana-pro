import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { MangaControlError } from '../../src/lib/mcp/contract.js';

const extensions = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
function dimensions(bytes, mimeType) {
  if (mimeType === 'image/png' && bytes.length >= 24 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  if (mimeType === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216) {
    let offset = 2;
    while (offset + 9 < bytes.length && bytes[offset] === 255) {
      const marker = bytes[offset + 1], length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
      if (length < 2) break; offset += 2 + length;
    }
    return { width: null, height: null };
  }
  if (mimeType === 'image/webp' && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP') return { width: null, height: null };
  throw new MangaControlError('INVALID_IMAGE', 'Asset bytes must match the declared PNG, JPEG or WebP type.');
}
export class AssetStore {
  constructor(store) { this.store = store; this.pending = new Map(); }
  async putDataUrl(dataUrl) {
    const match = dataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/\r\n]*={0,2})$/);
    if (!match) throw new MangaControlError('INVALID_IMAGE', 'Use a valid PNG/JPEG/WebP image.');
    const base64 = match[2].replace(/\s/g, ''), bytes = Buffer.from(base64, 'base64');
    if (!bytes.length || bytes.length >= 50_000_000 || bytes.toString('base64') !== base64) throw new MangaControlError('IMAGE_SIZE_OR_ENCODING', 'Image inputs must be valid base64 and below the existing 50 MB file limit.');
    const mimeType = match[1], sha256 = createHash('sha256').update(bytes).digest('hex');
    const shape = dimensions(bytes, mimeType);
    if (this.pending.has(sha256)) return this.pending.get(sha256);
    const operation = (async () => {
    const directory = await this.store.safeDirectory(path.join(this.store.root, 'objects'));
    const file = path.join(directory, `${sha256}.${extensions[mimeType]}`);
    await this.store.rejectLinkedFile(file);
    let exists = false;
    try {
      const existing = await fs.readFile(file); exists = true;
      if (createHash('sha256').update(existing).digest('hex') !== sha256) throw new MangaControlError('ASSET_CORRUPTED', 'An immutable stored asset has changed.');
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (!exists) {
      // The exclusive workspace owner is the only writer. A crash leaves an
      // unreferenced temp file, never a partial object under its final hash.
      const temporary = `${file}.${randomUUID()}.tmp`;
      const handle = await fs.open(temporary, 'wx', 0o600);
      try { await handle.writeFile(bytes); await handle.sync(); } finally { await handle.close(); }
      for (let attempt = 0; ; attempt += 1) {
        try { await this.store.rejectLinkedFile(file); await fs.rename(temporary, file); break; }
        catch (error) {
          if (!['EPERM', 'EACCES', 'EBUSY'].includes(error.code) || attempt === 5) throw error;
          await new Promise(resolve => setTimeout(resolve, 20 * (2 ** attempt)));
        }
      }
    }
    return { __mangaAsset: true, id: sha256, sha256, mimeType, bytes: bytes.length, ...shape, relativePath: `objects/${sha256}.${extensions[mimeType]}`, resourceUri: `manga://assets/${sha256}` };
    })();
    this.pending.set(sha256, operation);
    try { return await operation; } finally { this.pending.delete(sha256); }
  }
  async readBytes(reference) {
    if (!reference || !/^[a-f0-9]{64}$/.test(reference.sha256) || reference.id !== reference.sha256 || !extensions[reference.mimeType]) throw new MangaControlError('INVALID_ASSET_REFERENCE', 'Use an immutable asset reference returned by this server.');
    const directory = await this.store.safeDirectory(path.join(this.store.root, 'objects'));
    const file = path.join(directory, `${reference.sha256}.${extensions[reference.mimeType]}`); await this.store.rejectLinkedFile(file);
    const stat=await fs.stat(file);
    if(!stat.isFile()||stat.size<=0||stat.size>=50_000_000||reference.bytes!==stat.size)throw new MangaControlError('ASSET_SIZE_MISMATCH','Stored image size does not match its immutable reference.');
    const bytes = await fs.readFile(file);
    if (createHash('sha256').update(bytes).digest('hex') !== reference.sha256) throw new MangaControlError('ASSET_CORRUPTED', 'Stored image bytes no longer match their SHA-256.');
    dimensions(bytes,reference.mimeType);return bytes;
  }
  async dataUrl(reference) {
    const bytes=await this.readBytes(reference);
    return `data:${reference.mimeType};base64,${bytes.toString('base64')}`;
  }
  async reference(id) {
    if (!/^[a-f0-9]{64}$/.test(id)) throw new MangaControlError('INVALID_ASSET_ID', 'Use the SHA-256 asset ID returned by import or generation.');
    for (const [mimeType, extension] of Object.entries(extensions)) {
      const file = path.join(await this.store.safeDirectory(path.join(this.store.root, 'objects')), `${id}.${extension}`);
      try {
        await this.store.rejectLinkedFile(file);
        const bytes = await fs.readFile(file);
        if (createHash('sha256').update(bytes).digest('hex') !== id) throw new MangaControlError('ASSET_CORRUPTED', 'Stored asset bytes do not match their ID.');
        return { __mangaAsset: true, id, sha256: id, mimeType, bytes: bytes.length, ...dimensions(bytes, mimeType),
          relativePath: `objects/${id}.${extension}`, resourceUri: `manga://assets/${id}` };
      } catch (error) { if (error.code !== 'ENOENT') throw error; }
    }
    throw new MangaControlError('ASSET_NOT_FOUND', 'Import this image into the project workspace first.');
  }
  async dehydrate(value) {
    if (typeof value === 'string' && value.startsWith('data:image/')) return this.putDataUrl(value);
    if (value && typeof value === 'object' && typeof value.base64Img === 'string' && value.base64Img) {
      const { base64Img, ...metadata } = value;
      return { __mangaCandidate: true, image: await this.putDataUrl(`data:${value.mimeType || 'image/png'};base64,${base64Img}`), metadata: await this.dehydrate(metadata) };
    }
    if (Array.isArray(value)) return Promise.all(value.map(item => this.dehydrate(item)));
    if (value && typeof value === 'object') {
      const result = {}; for (const [key, child] of Object.entries(value)) Object.defineProperty(result, key, { value: await this.dehydrate(child), enumerable: true, writable: true, configurable: true }); return result;
    }
    return value;
  }
  async hydrate(value,cache=new Map()) {
    const image=reference=>{const key=`${reference.sha256}:${reference.id}:${reference.mimeType}`;if(!cache.has(key))cache.set(key,this.dataUrl(reference));return cache.get(key);};
    if (value?.__mangaAsset === true) return image(value);
    if (value?.__mangaCandidate === true) {
      const data = await image(value.image);
      return { ...await this.hydrate(value.metadata,cache), base64Img: data.slice(data.indexOf(',') + 1), mimeType: value.image.mimeType };
    }
    if (Array.isArray(value)) return Promise.all(value.map(item => this.hydrate(item,cache)));
    if (value && typeof value === 'object') return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, child]) => [key, await this.hydrate(child,cache)])));
    return value;
  }
}

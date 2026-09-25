export const GENERATED_IMAGE_METADATA_KEYWORD = 'furu.nano_banana_pro';

const SCHEMA_VERSION = 3;
const REPOSITORY_URL = 'https://github.com/FURUYAN1234/nano-banana-pro';
const DIGITAL_SOURCE_TYPE = 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';
const OMITTED_FIELDS = Object.freeze([
  'character_analysis',
  'background_analysis.location',
  'background_analysis.spatial_type',
  'background_analysis.lighting',
  'background_analysis.objects',
  'background_analysis.mood',
]);
const PNG_SIGNATURE = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
const JPEG_METADATA_MAGIC = new TextEncoder().encode('FURU_AI_JSON\0');
const JPEG_METADATA_VERSION = 1;
const JPEG_APP15_MARKER = 0xef;
const JPEG_MAX_PAYLOAD = 65533;

let crcTable = null;

const sanitizeText = (value) => String(value ?? '')
  .replace(/\bBearer\s+[A-Za-z0-9._~+/=-]{12,}/gi, '[REDACTED_API_KEY]')
  .replace(/\bsk-(?:proj-)?[A-Za-z0-9_-]{12,}\b/g, '[REDACTED_API_KEY]')
  .replace(/\bAIza[A-Za-z0-9_-]{20,}\b/g, '[REDACTED_API_KEY]')
  .replace(/[A-Za-z]:\\Users\\[^\s"'<>|\r\n]+/gi, '[REDACTED_LOCAL_PATH]');

const sanitizeValue = (value) => {
  if (typeof value === 'string') return sanitizeText(value);
  if (Array.isArray(value)) return value.map(sanitizeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, sanitizeValue(entry)]));
  }
  return value;
};

const bytesToBase64 = (bytes) => {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
};

const base64ToBytes = (base64) => {
  const binary = atob(base64.replace(/\s/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
};

const parseImageDataUrl = (dataUrl) => {
  const match = String(dataUrl || '').match(/^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i);
  if (!match) throw new Error('画像データを読み取れません。');
  const mimeType = match[1].toLowerCase() === 'image/jpg' ? 'image/jpeg' : match[1].toLowerCase();
  return { mimeType, bytes: base64ToBytes(match[2]) };
};

const toImageDataUrl = (mimeType, bytes) => `data:${mimeType};base64,${bytesToBase64(bytes)}`;

const sha256Hex = async (bytes) => {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
};

const providerName = (provider) => {
  if (String(provider).toLowerCase() === 'openai') return 'OpenAI';
  if (String(provider).toLowerCase() === 'gemini') return 'Google';
  return sanitizeText(provider || 'Unknown');
};

const buildInputImageRecords = (inputImages) => Promise.all(inputImages
  .filter(({ dataUrl }) => Boolean(dataUrl))
  .map(async ({ role, dataUrl }, index) => {
    const parsed = parseImageDataUrl(dataUrl);
    return {
      role: sanitizeText(role || 'reference'),
      index,
      mime_type: parsed.mimeType,
      byte_length: parsed.bytes.byteLength,
      sha256: await sha256Hex(parsed.bytes),
    };
  }));

const WEB_METADATA_FORBIDDEN_FIELDS = Object.freeze([
  'outputImage',
  'modelId',
  'fallbackOccurred',
  'generatedAt',
  'workflowMode',
]);

export const buildWebGenerationMetadata = async (options = {}) => {
  if (WEB_METADATA_FORBIDDEN_FIELDS.some(field => Object.hasOwn(options, field))) {
    throw new Error('Web版用制作情報にAPI画像専用項目は指定できません。');
  }
  const {
    appVersion,
    preparedAt,
    provider,
    scenario,
    finalPrompt,
    inputImages = [],
    settings = {},
  } = options;
  const safeProvider = sanitizeText(provider);
  const safeScenario = sanitizeText(scenario);
  const safePrompt = sanitizeText(finalPrompt);
  const safePreparedAt = sanitizeText(preparedAt);
  const recordHash = await sha256Hex(new TextEncoder().encode(JSON.stringify({
    app_version: sanitizeText(appVersion),
    prepared_at: safePreparedAt,
    provider: safeProvider,
    scenario: safeScenario,
    final_prompt: safePrompt,
  })));

  return {
    schema: GENERATED_IMAGE_METADATA_KEYWORD,
    schema_version: SCHEMA_VERSION,
    record_type: 'web_generation_companion',
    record_id: `urn:sha256:${recordHash}`,
    prepared_at: safePreparedAt,
    provenance: {
      digital_source_type: DIGITAL_SOURCE_TYPE,
      human_oversight_level: 'prompt_guided',
    },
    software: {
      name: 'Nano Banana Pro',
      version: sanitizeText(appVersion),
      repository: REPOSITORY_URL,
    },
    ai: {
      provider: safeProvider,
      model_id: null,
      fallback_occurred: null,
    },
    prompt: {
      workflow_mode: 'manual_web_generation',
      authorship: 'human_app_assisted',
      scenario: safeScenario,
      final_sent_prompt: safePrompt,
    },
    settings: sanitizeValue(settings),
    inputs: await buildInputImageRecords(inputImages),
    standards: {
      iptc: {
        digital_source_type: DIGITAL_SOURCE_TYPE,
        ai_system_used: `${providerName(safeProvider)} Web`,
        ai_system_version_used: null,
        ai_prompt_information: safePrompt,
        ai_prompt_writer_name: null,
      },
      c2pa: {
        ai_disclosure: {
          model_type: 'c2pa.types.model',
          model_name: null,
          model_identifier: null,
          human_oversight_level: 'prompt_guided',
        },
        cryptographically_signed: false,
      },
    },
    privacy: {
      policy: 'automatic_high_confidence_redaction',
      omitted_fields: [...OMITTED_FIELDS],
      api_key_included: false,
      raw_reference_images_included: false,
    },
  };
};

export const buildGeneratedImageMetadata = async ({
  appVersion,
  generatedAt,
  provider,
  modelId,
  workflowMode,
  humanOversightLevel = 'prompt_guided',
  scenario,
  finalPrompt,
  fallbackOccurred = false,
  inputImages = [],
  outputImage,
  settings = {},
}) => {
  const parsedOutput = parseImageDataUrl(outputImage);
  const outputHash = await sha256Hex(parsedOutput.bytes);
  const safeModelId = sanitizeText(modelId || 'unknown');
  const safePrompt = sanitizeText(finalPrompt);
  const inputs = await buildInputImageRecords(inputImages);

  return {
    schema: GENERATED_IMAGE_METADATA_KEYWORD,
    schema_version: SCHEMA_VERSION,
    record_type: 'api_image_generation',
    generation_id: `urn:sha256:${outputHash}`,
    generated_at: generatedAt,
    provenance: {
      digital_source_type: DIGITAL_SOURCE_TYPE,
      human_oversight_level: humanOversightLevel,
    },
    software: {
      name: 'Nano Banana Pro',
      version: sanitizeText(appVersion),
      repository: REPOSITORY_URL,
    },
    ai: {
      provider: sanitizeText(provider),
      model_id: safeModelId,
      fallback_occurred: Boolean(fallbackOccurred),
    },
    prompt: {
      workflow_mode: sanitizeText(workflowMode),
      authorship: 'human_app_assisted',
      scenario: sanitizeText(scenario),
      final_sent_prompt: safePrompt,
    },
    settings: sanitizeValue(settings),
    inputs,
    output: {
      mime_type: parsedOutput.mimeType,
      byte_length: parsedOutput.bytes.byteLength,
      content_sha256: outputHash,
    },
    standards: {
      iptc: {
        digital_source_type: DIGITAL_SOURCE_TYPE,
        ai_system_used: `${providerName(provider)} / ${safeModelId}`,
        ai_system_version_used: safeModelId,
        ai_prompt_information: safePrompt,
        ai_prompt_writer_name: null,
      },
      c2pa: {
        ai_disclosure: {
          model_type: 'c2pa.types.model',
          model_name: safeModelId,
          model_identifier: safeModelId,
          human_oversight_level: humanOversightLevel,
        },
        cryptographically_signed: false,
      },
    },
    privacy: {
      policy: 'automatic_high_confidence_redaction',
      omitted_fields: [...OMITTED_FIELDS],
      api_key_included: false,
      raw_reference_images_included: false,
    },
  };
};

export const serializeGeneratedImageMetadata = (metadata) => JSON.stringify(metadata, null, 2);

const getCrcTable = () => {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    crcTable[index] = value >>> 0;
  }
  return crcTable;
};

const crc32 = (bytes) => {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (const byte of bytes) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const uint32Bytes = (value) => Uint8Array.from([
  (value >>> 24) & 0xff,
  (value >>> 16) & 0xff,
  (value >>> 8) & 0xff,
  value & 0xff,
]);

const readUint32 = (bytes, offset) => (
  ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0
);

const concatBytes = (...parts) => {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
};

const createPngChunk = (type, data) => {
  const typeBytes = new TextEncoder().encode(type);
  const crc = uint32Bytes(crc32(concatBytes(typeBytes, data)));
  return concatBytes(uint32Bytes(data.length), typeBytes, data, crc);
};

const parsePngChunks = (bytes) => {
  if (!PNG_SIGNATURE.every((byte, index) => bytes[index] === byte)) throw new Error('PNG署名が正しくありません。');
  const chunks = [];
  let offset = PNG_SIGNATURE.length;
  while (offset + 12 <= bytes.length) {
    const length = readUint32(bytes, offset);
    const end = offset + 12 + length;
    if (end > bytes.length) throw new Error('PNGチャンクが破損しています。');
    const type = new TextDecoder().decode(bytes.subarray(offset + 4, offset + 8));
    chunks.push({ type, bytes: bytes.slice(offset, end), data: bytes.slice(offset + 8, offset + 8 + length) });
    offset = end;
    if (type === 'IEND') break;
  }
  return chunks;
};

const pngTextKeyword = (data) => {
  const end = data.indexOf(0);
  return end < 0 ? '' : new TextDecoder().decode(data.subarray(0, end));
};

const embedPngMetadata = (bytes, json) => {
  const keyword = new TextEncoder().encode(GENERATED_IMAGE_METADATA_KEYWORD);
  const text = new TextEncoder().encode(json);
  const iTxtData = concatBytes(keyword, Uint8Array.from([0, 0, 0, 0, 0]), text);
  const metadataChunk = createPngChunk('iTXt', iTxtData);
  const kept = parsePngChunks(bytes).filter(chunk => !(chunk.type === 'iTXt' && pngTextKeyword(chunk.data) === GENERATED_IMAGE_METADATA_KEYWORD));
  const output = [PNG_SIGNATURE];
  for (const chunk of kept) {
    if (chunk.type === 'IEND') output.push(metadataChunk);
    output.push(chunk.bytes);
  }
  return concatBytes(...output);
};

const extractPngMetadata = (bytes) => {
  const chunk = parsePngChunks(bytes).find(entry => entry.type === 'iTXt' && pngTextKeyword(entry.data) === GENERATED_IMAGE_METADATA_KEYWORD);
  if (!chunk) return null;
  let offset = GENERATED_IMAGE_METADATA_KEYWORD.length + 1;
  const compressionFlag = chunk.data[offset];
  offset += 2;
  while (offset < chunk.data.length && chunk.data[offset] !== 0) offset += 1;
  offset += 1;
  while (offset < chunk.data.length && chunk.data[offset] !== 0) offset += 1;
  offset += 1;
  if (compressionFlag !== 0) throw new Error('圧縮されたPNG制作情報には対応していません。');
  return new TextDecoder().decode(chunk.data.subarray(offset));
};

const startsWithBytes = (bytes, prefix, offset = 0) => prefix.every((byte, index) => bytes[offset + index] === byte);

const parseJpegHeaderSegments = (bytes) => {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('JPEG署名が正しくありません。');
  const segments = [];
  let offset = 2;
  while (offset + 1 < bytes.length && bytes[offset] === 0xff) {
    const markerOffset = offset;
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset];
    offset += 1;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > bytes.length) throw new Error('JPEGセグメントが破損しています。');
    const length = (bytes[offset] << 8) | bytes[offset + 1];
    if (length < 2 || offset + length > bytes.length) throw new Error('JPEGセグメント長が正しくありません。');
    segments.push({ marker, start: markerOffset, end: offset + length, dataStart: offset + 2, dataEnd: offset + length });
    offset += length;
  }
  return segments;
};

const isAppMetadataSegment = (bytes, segment) => segment.marker === JPEG_APP15_MARKER
  && startsWithBytes(bytes, JPEG_METADATA_MAGIC, segment.dataStart);

const removeJpegMetadata = (bytes) => {
  const segments = parseJpegHeaderSegments(bytes).filter(segment => isAppMetadataSegment(bytes, segment));
  if (segments.length === 0) return bytes;
  const output = [];
  let offset = 0;
  for (const segment of segments) {
    output.push(bytes.slice(offset, segment.start));
    offset = segment.end;
  }
  output.push(bytes.slice(offset));
  return concatBytes(...output);
};

const writeUint16 = (value) => Uint8Array.from([(value >>> 8) & 0xff, value & 0xff]);

const createJpegMetadataSegments = (json) => {
  const jsonBytes = new TextEncoder().encode(json);
  const headerLength = JPEG_METADATA_MAGIC.length + 1 + 2 + 2 + 4;
  const chunkLength = JPEG_MAX_PAYLOAD - headerLength;
  const partCount = Math.ceil(jsonBytes.length / chunkLength) || 1;
  if (partCount > 65535) throw new Error('制作情報JSONが大きすぎます。');
  const segments = [];
  for (let partIndex = 0; partIndex < partCount; partIndex += 1) {
    const chunk = jsonBytes.slice(partIndex * chunkLength, (partIndex + 1) * chunkLength);
    const payload = concatBytes(
      JPEG_METADATA_MAGIC,
      Uint8Array.of(JPEG_METADATA_VERSION),
      writeUint16(partIndex),
      writeUint16(partCount),
      uint32Bytes(jsonBytes.length),
      chunk,
    );
    segments.push(concatBytes(Uint8Array.of(0xff, JPEG_APP15_MARKER), writeUint16(payload.length + 2), payload));
  }
  return concatBytes(...segments);
};

const embedJpegMetadata = (bytes, json) => {
  const cleaned = removeJpegMetadata(bytes);
  const leadingApplicationSegments = parseJpegHeaderSegments(cleaned)
    .filter(segment => segment.start === 2 || segment.marker === 0xe0 || segment.marker === 0xe1);
  let insertionOffset = 2;
  for (const segment of leadingApplicationSegments) {
    if (segment.start !== insertionOffset || (segment.marker !== 0xe0 && segment.marker !== 0xe1)) break;
    insertionOffset = segment.end;
  }
  return concatBytes(
    cleaned.slice(0, insertionOffset),
    createJpegMetadataSegments(json),
    cleaned.slice(insertionOffset),
  );
};

const extractJpegMetadata = (bytes) => {
  const segments = parseJpegHeaderSegments(bytes).filter(segment => isAppMetadataSegment(bytes, segment));
  if (segments.length === 0) return null;
  const headerOffset = JPEG_METADATA_MAGIC.length;
  const parts = segments.map(segment => {
    const start = segment.dataStart + headerOffset;
    if (bytes[start] !== JPEG_METADATA_VERSION) throw new Error('未対応のJPEG制作情報バージョンです。');
    const partIndex = (bytes[start + 1] << 8) | bytes[start + 2];
    const partCount = (bytes[start + 3] << 8) | bytes[start + 4];
    const totalLength = readUint32(bytes, start + 5);
    return { partIndex, partCount, totalLength, data: bytes.slice(start + 9, segment.dataEnd) };
  }).sort((left, right) => left.partIndex - right.partIndex);
  const { partCount, totalLength } = parts[0];
  if (parts.length !== partCount || parts.some((part, index) => part.partIndex !== index || part.partCount !== partCount || part.totalLength !== totalLength)) {
    throw new Error('JPEG制作情報の分割データが不足しています。');
  }
  const jsonBytes = concatBytes(...parts.map(part => part.data));
  if (jsonBytes.length !== totalLength) throw new Error('JPEG制作情報の長さが一致しません。');
  return new TextDecoder().decode(jsonBytes);
};

export const embedGeneratedImageMetadata = (dataUrl, metadata) => {
  const { mimeType, bytes } = parseImageDataUrl(dataUrl);
  if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
    throw new Error('制作情報の埋め込みはPNGまたはJPEGに対応しています。');
  }
  const json = serializeGeneratedImageMetadata(metadata);
  const embedded = mimeType === 'image/png' ? embedPngMetadata(bytes, json) : embedJpegMetadata(bytes, json);
  return toImageDataUrl(mimeType, embedded);
};

export const extractGeneratedImageMetadata = async (dataUrl) => {
  const { mimeType, bytes } = parseImageDataUrl(dataUrl);
  const json = mimeType === 'image/png' ? extractPngMetadata(bytes) : extractJpegMetadata(bytes);
  return json ? JSON.parse(json) : null;
};

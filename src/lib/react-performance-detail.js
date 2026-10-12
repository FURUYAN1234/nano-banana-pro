export const MAX_REACT_PERFORMANCE_DETAIL_BYTES = 32 * 1024;

const installedMeasures = new WeakMap();
const encoder = new TextEncoder();
const byteLength = value => encoder.encode(JSON.stringify(value)).length;
const shorten = value => value.length > 256 ? `${value.slice(0, 255)}…` : value;
const omitted = ['…', 'Additional prop details omitted.'];

export function boundReactPerformanceDetail(options) {
  const detail = options?.detail, devtools = detail?.devtools;
  if (devtools?.track !== 'Components ⚛' || !Array.isArray(devtools.properties)
    || !devtools.properties.every(entry => Array.isArray(entry) && entry.length === 2
      && entry.every(value => typeof value === 'string'))) return options;

  const properties = [];
  const boundedDetail = { ...detail, devtools: { ...devtools, properties } };
  let used = byteLength(boundedDetail), changed = false;
  const reserved = byteLength(omitted) + 1;
  for (const entry of devtools.properties) {
    // 画像が名前にも値にも入るため、巨大な元データをシリアライズする前に短縮する。
    const bounded = entry.map(shorten);
    const size = byteLength(bounded) + (properties.length ? 1 : 0);
    if (used + size + reserved > MAX_REACT_PERFORMANCE_DETAIL_BYTES) {
      properties.push(omitted);
      changed = true;
      break;
    }
    properties.push(bounded);
    used += size;
    changed ||= bounded.some((value, index) => value !== entry[index]);
  }
  return changed ? { ...options, detail: boundedDetail } : options;
}

export function installReactPerformanceDetail({ development = false, performanceApi = globalThis.performance } = {}) {
  if (!development || typeof performanceApi?.measure !== 'function') return;
  if (installedMeasures.get(performanceApi) === performanceApi.measure) return;
  const measure = performanceApi.measure;
  performanceApi.measure = function (...args) {
    if (args.length > 1) args[1] = boundReactPerformanceDetail(args[1]);
    return Reflect.apply(measure, this, args);
  };
  installedMeasures.set(performanceApi, performanceApi.measure);
}

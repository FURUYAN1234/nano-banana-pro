export class MangaControlError extends Error {
  constructor(code, message) { super(message); this.name = 'MangaControlError'; this.code = code; }
}

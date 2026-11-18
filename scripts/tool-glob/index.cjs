'use strict';

const { Minimatch } = require('minimatch');
const scan = require('./lib/scan.js');

// Vite, fdir and tinyglobby call the predicate. fast-glob consumes its .test
// interface via micromatch.makeRe(). Both paths use the same segment matcher.
function compile(pattern, options = {}, returnState = false) {
  const ignore = options.ignore && compile(options.ignore, { ...options, ignore: undefined });
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const matchers = patterns.map((value) => {
    if (typeof value !== 'string' || !value) throw new TypeError('Expected a nonempty glob');
    let start = 0;
    while (!options.nonegate && value[start] === '!' && value[start + 1] !== '(') start++;
    const expression = value.slice(start);
    const settings = {
      platform: 'linux',
      dot: options.dot,
      matchBase: options.matchBase || options.basename,
      nocase: options.nocase,
      nocomment: true,
      nonegate: true,
      nobrace: options.nobrace,
      noext: options.noext || options.noextglob,
      noglobstar: options.noglobstar,
    };
    const matcher = new Minimatch(expression, settings);
    // A final globstar also matches its directory in Vite and tinyglobby.
    const includeDirectory = !options.strictSlashes && !options.noglobstar && expression.endsWith('/**');
    return (path) => {
      const matches = matcher.match(path) || (includeDirectory && matcher.match(path + '/'));
      return start % 2 === 1 ? !matches : matches;
    };
  });
  const state = returnState && typeof pattern === 'string' ? scan(pattern, options) : undefined;
  const predicate = (input, returnObject = false) => {
    if (typeof input !== 'string') throw new TypeError('Expected a path string');
    const path = (options.windows ?? process.platform === 'win32') ? input.replaceAll('\\', '/') : input;
    const matched = Boolean(path) && matchers.some((matches) => matches(path));
    const ignored = matched && Boolean(ignore && ignore(path));
    const isMatch = matched && !ignored;
    if (!returnObject && !options.onResult && !options.onMatch && !options.onIgnore) return isMatch;
    const result = { glob: pattern, state, input, output: path, isMatch: matched };
    options.onResult?.(result);
    if (ignored) options.onIgnore?.(result);
    result.isMatch = isMatch;
    if (isMatch) options.onMatch?.(result);
    return returnObject ? result : isMatch;
  };
  if (returnState) predicate.state = state;
  return predicate;
}

compile.scan = scan;
compile.makeRe = (pattern, options) => ({ test: compile(pattern, options) });
compile.isMatch = (input, pattern, options) => compile(pattern, options)(input);
module.exports = compile;

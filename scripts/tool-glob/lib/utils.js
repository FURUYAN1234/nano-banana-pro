'use strict';

const { REGEX_BACKSLASH, REGEX_REMOVE_BACKSLASH } = require('./constants');
exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');
exports.isWindows = () => process.platform === 'win32';
exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

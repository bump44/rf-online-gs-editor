import { isString, trim } from 'lodash';
import md5 from 'blueimp-md5';

export function getNumberOfLetter(letter, startChar = 'a') {
  const startPos = startChar.charCodeAt(0);
  const currentPos = letter.toLowerCase().charCodeAt(0);
  return currentPos - startPos;
}

export function getWorkdirFileName(pl = '') {
  const arr = pl instanceof Array ? pl : [pl];
  return md5(arr.map(val => val.replace(/[^a-z0-9_-]/gi, '_')).join('_'));
}

export const normalize = (_str, substring) => {
  if (!isString(_str)) {
    return '';
  }

  const str = _str.substring(0, substring || _str.length);
  const valid = [];

  for (let i = 0; i < str.length; i += 1) {
    const symbol = str[i];
    if (/\0/g.test(symbol)) {
      break;
    }
    valid.push(symbol);
  }

  return trim(valid.join('').replace('  ', ' '));
};

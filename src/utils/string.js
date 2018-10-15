import { isString, trim } from 'lodash';

export function getNumberOfLetter(letter, startChar = 'a') {
  const startPos = startChar.charCodeAt(0);
  const currentPos = letter.toLowerCase().charCodeAt(0);
  return currentPos - startPos;
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

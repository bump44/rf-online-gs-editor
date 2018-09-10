import { random } from 'lodash';

const wordStack = 'qwertyuiopasdfghjklzxcvbnm';

/**
 * Generate random words
 * @param {Number} count
 */
const words = (count = 3) =>
  Array.from(Array(count))
    .map(() => wordStack[random(0, wordStack.length - 1)])
    .join('');

/**
 * Generate number suffix for server item codes (eq. iyyyy[99], iyayy[05])
 * @param {Number} min
 * @param {Number} max
 */
const numberSuffix = (min = 1, max = 99) => {
  const number = random(min, max).toString();
  if (number.length === 1) {
    return `0${number}`;
  }
  return number;
};

/**
 * Generate random server item codes (eq. iyyyy99, iyayy05)
 */
const serverCode = () => {
  const w3 = words(3);
  const n2 = numberSuffix();
  return `${w3}${n2}`;
};

export default random;
export { words, numberSuffix, serverCode };

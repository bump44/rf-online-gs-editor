import random, { words, numberSuffix, serverCode } from '../random';

/**
 * Test random
 */

describe('random', () => {
  it('Should return random int', () => {
    expect(random(0, 0)).toBe(0);
    expect(random(1, 1)).toBe(1);
    expect(Number.isInteger(random(100, 999))).toBeTruthy();
  });
  it('Should return random words', () => {
    expect(words().length).toBe(3);
    expect(words(0).length).toBe(0);
    expect(words(1).length).toBe(1);
    expect(words(99).length).toBe(99);
  });
  it('Should return random numberSuffix', () => {
    expect(numberSuffix(0, 0)).toBe('00');
    expect(numberSuffix(1, 1)).toBe('01');
    expect(numberSuffix(99, 99)).toBe('99');
    expect(typeof numberSuffix()).toBe('string');
  });
  it('Should return random serverCode', () => {
    expect(serverCode().length).toBe(5);
    Array.from(Array(100)).forEach(() =>
      expect(/^\w{3}\d{2}$/.test(serverCode())).toBeTruthy(),
    );
  });
});

export function getNumberOfLetter(letter, startChar = 'a') {
  const startPos = startChar.charCodeAt(0);
  const currentPos = letter.toLowerCase().charCodeAt(0);
  return currentPos - startPos;
}

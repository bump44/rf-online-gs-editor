import path from 'path';
import { words } from './random';
import { TMP_FOLDER } from './constants';

const getTmpPath = () => path.resolve('./', TMP_FOLDER);

const getRandomTmpPath = () => {
  const folders = [words(6), words(6), words(6)];
  return path.resolve(getTmpPath(), folders.join('/'));
};

export { getTmpPath, getRandomTmpPath };

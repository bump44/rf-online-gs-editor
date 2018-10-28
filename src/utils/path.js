import { compact } from 'lodash';
import path from 'path';
import uuid from 'uuid/v4';

import { TMP_FOLDER, RELEASE_FILES_FOLDER } from './constants';
import { words } from './random';

const getTmpPath = () => path.resolve('./', TMP_FOLDER);
const getReleaseFilesPath = (...subfolders) =>
  path.resolve('./', ...compact([RELEASE_FILES_FOLDER, ...subfolders]));

const getRandomTmpPath = () => {
  const folders = [uuid(), words(6)];
  return path.resolve(getTmpPath(), folders.join('/'));
};

export { getTmpPath, getReleaseFilesPath, getRandomTmpPath };

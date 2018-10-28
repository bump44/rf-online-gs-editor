import { call, put } from 'redux-saga/effects';
import { copy } from 'fs-extra';
import { delay } from 'redux-saga';
import { chunk, trim } from 'lodash';

import { COUNT } from '~/classes/constants';
import apolloClient from '~/apollo';
import path from 'path';
import recreaddir from 'recursive-readdir';
import ClientResourceReader from '~/structs/client/resource/reader';
import ResourceImportClientMutation from '~/apollo/mutations/resource_import_client';
import { isBone, isMesh, isAni } from '~/structs/resource_types_utils';
import { normalize, getWorkdirFileName } from '~/utils/string';
import { unpackByPath } from '~/utils/rfs';
import { isExists, mkdirSync } from '~/utils/fs';
import { getReleaseFilesPath } from '~/utils/path';

/**
 * Import Client Resources Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
  workdirPath,
}) {
  yield mkdirSync(getReleaseFilesPath(workdirPath));

  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const rfsFiles = yield rfsUnpackAll(path.resolve(filePath, '../../'), {
    actions,
  });

  const fileReader = new ClientResourceReader({ path: filePath });
  yield call(fileReader.asyncLoadSubclasses.bind(fileReader));

  const headers = yield call(fileReader.getHeaders.bind(fileReader));
  const total = headers.reduce(
    (accumulator, currentValue) => accumulator + currentValue.header[COUNT],
    0,
  );

  let countCompleted = 0;

  yield put(actions.changeCountTotal(total));
  const sections = yield call(fileReader.getBlocks.bind(fileReader));

  let i = 0;
  while (sections.length > i) {
    const section = sections[i];
    const { blocks, type } = section;
    const chunks = chunk(blocks, 50);

    let t = 0;
    while (chunks.length > t) {
      yield apolloClient.mutate({
        mutation: ResourceImportClientMutation,
        variables: {
          projectId,
          type,
          blocks: chunks[t],
          importType,
        },
      });

      let f = 0;

      while (chunks[t].length > f) {
        const vals = chunks[t][f];

        if (isBone(type)) {
          yield boneWorkAfterInsert(vals, { filePath, workdirPath });
        } else if (isMesh(type)) {
          yield meshWorkAfterInsert(vals, { filePath, workdirPath, rfsFiles });
        } else if (isAni(type)) {
          yield aniWorkAfterInsert(vals, { filePath, workdirPath, rfsFiles });
        }

        f += 1;
      }

      countCompleted += chunks[t].length;
      yield put(actions.changeCountCompleted(countCompleted));
      t += 1;
    }
    i += 1;
  }

  return sections;
}

function* rfsUnpackAllByPath(subfolder, clientPath, { actions }) {
  if (!subfolder) {
    throw new Error('Argument `subfolder` is required');
  }

  const subfolderPath = path.resolve(clientPath, subfolder);
  const exists = yield isExists(subfolderPath);

  if (!exists || !exists.isDirectory()) {
    throw new Error(`ENOENT: ${subfolderPath}`);
  }

  const files = (yield recreaddir(subfolderPath))
    .filter(file => /^.+?\.rfs$/i.test(file))
    .map(file => file.toUpperCase());

  yield put(actions.changeCountTotal(files.length));

  // unpack all
  let i = 0;
  const rfsFiles = {};

  while (files.length > i) {
    const file = files[i];
    const data = yield unpackByPath(file);
    const resourceFileFolderStyle = `.\\${trim(
      file
        .replace(clientPath.toUpperCase(), '')
        .replace(path.parse(file).base, ''),
      '\\',
    )}\\`;

    data.forEach(fileData => {
      rfsFiles[
        getWorkdirFileName([resourceFileFolderStyle, fileData.fileName])
      ] = fileData;
    });

    i += 1;

    yield put(actions.changeCountCompleted(i));
  }

  return rfsFiles;
}

function* rfsUnpackAll(clientPath, { actions }) {
  const characterRfsFiles = yield rfsUnpackAllByPath('Character', clientPath, {
    actions,
  });

  const itemRfsFiles = yield rfsUnpackAllByPath('Item', clientPath, {
    actions,
  });

  return {
    ...characterRfsFiles,
    ...itemRfsFiles,
  };
}

function* boneWorkAfterInsert(
  { strFileNameBBX, strFileNameBN, strPath },
  { filePath, workdirPath } = {},
) {
  const bbx = normalize(strFileNameBBX, 64).toUpperCase();
  const bn = normalize(strFileNameBN, 64).toUpperCase();
  const folderPath = normalize(strPath, 128).toUpperCase();

  const bbxFilePath = path.resolve(filePath, '../../', folderPath, bbx);
  const isExistsBbx = yield isExists(bbxFilePath);

  const bnFilePath = path.resolve(filePath, '../../', folderPath, bn);
  const isExistsBn = yield isExists(bnFilePath);

  if (isExistsBbx && isExistsBbx.isFile()) {
    yield copy(
      bbxFilePath,
      getReleaseFilesPath(workdirPath, getWorkdirFileName([folderPath, bbx])),
    );
  }

  if (isExistsBn && isExistsBn.isFile()) {
    yield copy(
      bnFilePath,
      getReleaseFilesPath(workdirPath, getWorkdirFileName([folderPath, bn])),
    );
  }
}

function* meshWorkAfterInsert(
  { strFileName, strPath },
  { filePath, workdirPath, rfsFiles } = {},
) {
  const fileName = normalize(strFileName, 64).toUpperCase();
  const folderPath = `.\\${trim(
    trim(normalize(strPath, 128).toUpperCase(), '.').replace('/', '\\'),
    '\\',
  )}\\`;

  const workdirFileName = getWorkdirFileName([folderPath, fileName]);
  const workdirFilePath = getReleaseFilesPath(workdirPath, workdirFileName);

  if (rfsFiles[workdirFileName] !== undefined) {
    yield copy(rfsFiles[workdirFileName].filePath, workdirFilePath);
  } else {
    const sFilePath = path.resolve(filePath, '../../', folderPath, fileName);
    const isExistsFile = yield isExists(sFilePath);

    if (!isExistsFile || !isExistsFile.isFile()) {
      // throw new Error(`ENOENT: ${sFilePath}`);
      return; // skip
    }

    yield copy(sFilePath, workdirFilePath);
  }
}

function* aniWorkAfterInsert(...args) {
  yield meshWorkAfterInsert(...args);
}

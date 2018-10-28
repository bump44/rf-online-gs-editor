import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { trim, compact, isString, chunk } from 'lodash';
import { copy } from 'fs-extra';
import gql from 'graphql-tag';
import path from 'path';

import { ORDER, COUNT } from '~/classes/constants';

import Struct from '~/classes/Struct';
import BufferGenerator from '~/classes/BufferGenerator';
import readerStruct from '~/structs/client/resource/reader_struct';

import apolloClient from '~/apollo';
import resourcesTotalQuery from '~/apollo/queries/sub/resources_total';

import { getReleaseFilesPath } from '~/utils/path';
import { mkdirSync, writeFile, isExists, readDir } from '~/utils/fs';
import { enCryptByBuf } from '~/utils/edf';
import { repack } from '~/utils/rfs';

import {
  RELEASE_FILES_CLIENT_FOLDER,
  RELEASE_FILES_CLIENTDAT_FOLDER,
} from '~/utils/constants';

import { isBone, isMesh, isAni } from '~/structs/resource_types_utils';
import { normalize, getWorkdirFileName } from '~/utils/string';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      resources(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          type
          ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
        }
        total
      }
    }
  `;
}

function* loadObjects({ type, projectId, fieldNames, loaded, changeLoaded }) {
  let nextLoaded = loaded;
  const objects = [];
  const QUERY_OBJECTS = buildQueryObjects(fieldNames);

  // eslint-disable-next-line
  while (true) {
    const result = yield apolloClient.query({
      query: QUERY_OBJECTS,
      variables: {
        skip: objects.length,
        take: 100,
        sort: { createdAt: 1 },
        where: { type, projectId },
      },
    });

    objects.push(...result.data.resources.items);
    nextLoaded += result.data.resources.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.resources.items.length <= 0) {
      break;
    }
  }

  return objects;
}

/**
 * Export Client Items Resolver
 */
export default function* defaultSaga({
  projectId,
  actions,
  fileData,
  releasePath,
  workdirPath,
}) {
  yield delay(1000);
  const parsePath = path.parse(fileData.path);
  const fileName = parsePath.name;
  const fileDir = parsePath.dir;
  const bufferGenerator = new BufferGenerator();

  yield mkdirSync(
    getReleaseFilesPath(releasePath, RELEASE_FILES_CLIENT_FOLDER, fileDir),
  );

  yield mkdirSync(
    getReleaseFilesPath(releasePath, RELEASE_FILES_CLIENTDAT_FOLDER, fileDir),
  );

  const total = yield apolloClient.query({
    query: resourcesTotalQuery,
    variables: { where: { projectId } },
  });

  yield put(actions.changeTotal(total.data.resources.total));

  let i = 0;
  let loaded = 0;

  while (readerStruct.length > i) {
    const section = readerStruct[i];
    const { header, type, block } = section;

    const objects = yield loadObjects({
      type,
      projectId,
      fieldNames: block.getFieldNames(),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;

    const blockFields = block.getFields();
    const headerFields = header instanceof Struct ? header.getFields() : header;

    const headerValues = {
      [COUNT]: objects.length,
    };

    headerFields.forEach(field => {
      if (field.getName() === ORDER) {
        bufferGenerator.addInt16BE(headerValues[field.getName()]);
      } else {
        bufferGenerator.addByField(field, headerValues[field.getName()]);
      }
    });

    const buffers = [];
    objects.forEach(object => {
      const values = { ...object };
      const buffer = new BufferGenerator();

      blockFields.forEach(field => {
        buffer.addByField(field, values[field.getName()], undefined, values);
      });

      buffers.push(buffer.getBuffer());
    });

    bufferGenerator.concat(...buffers);

    // copying textures to release directories
    yield afterGenerateBuffer({
      type,
      objects,
      bufferGenerator,
      releasePath,
      workdirPath,
    });

    i += 1;
  }

  yield writeFile(
    getReleaseFilesPath(
      releasePath,
      RELEASE_FILES_CLIENTDAT_FOLDER,
      fileDir,
      `${fileName}.dat`,
    ),
    bufferGenerator.getBuffer(),
  );

  yield writeFile(
    getReleaseFilesPath(
      releasePath,
      RELEASE_FILES_CLIENT_FOLDER,
      fileDir,
      `${fileName}.edf`,
    ),
    yield enCryptByBuf(bufferGenerator.getBuffer()),
  );
}

function* afterGenerateBuffer({ type, objects, releasePath, workdirPath }) {
  const callPayload = { type, objects, releasePath, workdirPath };

  if (isBone(type)) {
    yield call(afterGenerateBufferCopyBones, callPayload);
  }

  if (isMesh(type)) {
    yield call(afterGenerateBufferRepackAndCopyMeshes, callPayload);
  }

  if (isAni(type)) {
    yield call(afterGenerateBufferRepackAndCopyAnis, callPayload);
  }
}

function* afterGenerateBufferCopyBones({ objects, releasePath, workdirPath }) {
  const pathes = {};

  objects.forEach(object => {
    const fileNameBBX = normalize(object.strFileNameBBX, 64).toUpperCase();
    const fileNameBN = normalize(object.strFileNameBN, 64).toUpperCase();
    const folderPath = normalizeResourcePath(object.strPath);
    const folderPathHash = getWorkdirFileName(folderPath);

    if (pathes[folderPathHash] === undefined) {
      pathes[folderPathHash] = {
        folderPath,
        path: path.resolve(
          releasePath,
          RELEASE_FILES_CLIENT_FOLDER,
          folderPath,
        ),
        files: [],
      };
    }

    const files = compact([fileNameBBX, fileNameBN])
      .filter(isString)
      .map(file => ({
        name: file,
        hash: getWorkdirFileName([folderPath, file]),
        path: path.resolve(
          releasePath,
          RELEASE_FILES_CLIENT_FOLDER,
          folderPath,
          file,
        ),
      }))
      .map(file => ({
        ...file,
        shouldBeHerePaths: [
          path.resolve(workdirPath, folderPath, file.name),
          path.resolve(workdirPath, file.hash),
        ],
      }));

    if (files.length > 0) {
      pathes[folderPathHash].files.push(...files);
    }
  });

  // copy files to release directory
  let i = 0;
  const patchesKeys = Object.keys(pathes);
  while (patchesKeys.length > i) {
    const data = pathes[patchesKeys[i]];
    if (data.files.length > 0) {
      yield mkdirSync(data.path);
    }
    let t = 0;
    while (data.files.length > t) {
      const file = data.files[t];
      const filePath = yield takeValidFilePath(file.shouldBeHerePaths);
      if (filePath !== null) {
        yield copy(filePath, file.path);
      }
      t += 1;
    }
    i += 1;
  }
}

function* afterGenerateBufferRepackAndCopyMeshes({
  objects,
  workdirPath,
  releasePath,
}) {
  const pathes = {};

  objects.forEach(object => {
    const fileName = normalize(object.strFileName, 64).toUpperCase();
    const folderPath = normalizeResourcePath(object.strPath);
    const folderPathHash = getWorkdirFileName(folderPath);

    if (pathes[folderPathHash] === undefined) {
      pathes[folderPathHash] = {
        folderPath,
        path: path.resolve(
          releasePath,
          RELEASE_FILES_CLIENT_FOLDER,
          folderPath,
        ),
        files: [],
      };
    }

    const files = compact([fileName])
      .filter(isString)
      .map(file => ({
        name: file,
        hash: getWorkdirFileName([folderPath, file]),
        path: path.resolve(
          releasePath,
          RELEASE_FILES_CLIENT_FOLDER,
          folderPath,
          file,
        ),
      }))
      .map(file => ({
        ...file,
        shouldBeHerePaths: [
          path.resolve(workdirPath, folderPath, file.name),
          path.resolve(workdirPath, file.hash),
        ],
      }));

    if (files.length > 0) {
      pathes[folderPathHash].files.push(...files);
    }
  });

  // repack and copy files to release directory
  let i = 0;
  const patchesKeys = Object.keys(pathes);
  while (patchesKeys.length > i) {
    const data = pathes[patchesKeys[i]];
    if (data.files.length > 0) {
      yield mkdirSync(data.path);
    }

    let t = 0;
    const chunks = chunk(data.files, 150);

    while (chunks.length > t) {
      let f = 0;
      const chunkData = chunks[t];
      const validFilePaths = [];

      while (chunkData.length > f) {
        const file = chunkData[f];
        const filePath = yield takeValidFilePath(file.shouldBeHerePaths);
        if (filePath !== null) {
          validFilePaths.push({
            path: filePath,
            name: file.name,
          });
        }
        f += 1;
      }

      // repack & copy
      if (validFilePaths.length > 0) {
        const packedPath = yield repack(validFilePaths);
        const packedName = `PACKED${i}${t}_${f}.RFS`;

        yield copy(packedPath, path.resolve(data.path, packedName));
      }

      t += 1;
    }

    // readDir & generate RFSInfo.dat
    const rfsFiles = (yield readDir(data.path)).filter(file =>
      /^.+?\.RFS$/gi.test(file),
    );

    const buffGen = new BufferGenerator();
    rfsFiles.forEach(rfsFileName => {
      buffGen.addString(rfsFileName);
      buffGen.concat(Buffer.from([0x0d, 0x0a]));
    });

    yield writeFile(
      path.resolve(data.path, 'RFSInfo.dat'),
      buffGen.getBuffer(),
    );

    i += 1;
  }
}

function* afterGenerateBufferRepackAndCopyAnis(...args) {
  return yield afterGenerateBufferRepackAndCopyMeshes(...args); // compared
}

function* takeValidFilePath(paths = []) {
  let i = 0;

  while (paths.length > i) {
    const stat = yield isExists(paths[i]);

    if (stat && stat.isFile()) {
      return paths[i];
    }

    i += 1;
  }

  return null;
}

function normalizeResourcePath(str) {
  return `.\\${trim(
    trim(normalize(str, 128).toUpperCase(), '.').replace('/', '\\'),
    '\\',
  )}\\`;
}

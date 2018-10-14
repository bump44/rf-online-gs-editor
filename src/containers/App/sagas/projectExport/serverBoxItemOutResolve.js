import path from 'path';
import gql from 'graphql-tag';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
  TOTAL_SIZE,
  BLOCK_SIZE,
  COUNT,
  COUNT_COLUMNS,
} from '../../../../classes/constants';
import Struct from '../../../../classes/Struct';
import BufferGenerator from '../../../../classes/BufferGenerator';
import serverBoxItemOutReaderStruct from '../../../../structs/server/boxItemOut/reader_struct';
import { getReleaseFilesPath } from '../../../../utils/path';
import { mkdirSync, writeFile } from '../../../../utils/fs';
import { RELEASE_FILES_SERVER_FOLDER } from '../../../../utils/constants';
import apolloClient from '../../../../apollo';
import projectBoxItemOutsTotalQuery from '../../../../apollo/queries/sub/project_boxItemOuts_total';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      projectBoxItemOuts(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
        }
        total
      }
    }
  `;
}

function* loadObjects({ projectId, fieldNames, loaded, changeLoaded }) {
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
        sort: { nIndex: 1 },
        where: { projectId },
      },
    });

    objects.push(...result.data.projectBoxItemOuts.items);
    nextLoaded += result.data.projectBoxItemOuts.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.projectBoxItemOuts.items.length <= 0) {
      break;
    }
  }

  return objects;
}

function fillBuffer(
  bufferGenerator,
  { block, header },
  objects = [],
  fnValues,
) {
  const blockFields = block.getFields();
  const headerFields = header instanceof Struct ? header.getFields() : header;

  const headerValues = {
    [TOTAL_SIZE]: block.getWeight() * objects.length + 8,
    [BLOCK_SIZE]: block.getWeight(),
    [COUNT]: objects.length,
    [COUNT_COLUMNS]: blockFields.length,
  };

  headerFields.forEach(field => {
    bufferGenerator.addByField(field, headerValues[field.getName()]);
  });

  const buffers = [];
  objects.forEach(object => {
    const values = typeof fnValues === 'function' ? fnValues(object) : {};
    const buffer = new BufferGenerator();
    blockFields.forEach(field => {
      buffer.addByField(field, values[field.getName()], undefined, values);
    });
    buffers.push(buffer.getBuffer());
  });

  bufferGenerator.concat(...buffers);
}

/**
 * Export Server Items Resolver
 */
export default function* defaultSaga({ projectId, actions, fileData }) {
  yield delay(1000);

  const readerStruct = serverBoxItemOutReaderStruct;
  const total = yield apolloClient.query({
    query: projectBoxItemOutsTotalQuery,
    variables: { where: { projectId } },
  });

  yield put(actions.changeTotal(total.data.projectBoxItemOuts.total));

  let i = 0;
  let loaded = 0;

  const bufferGenerator = new BufferGenerator();

  while (readerStruct.length > i) {
    const objects = yield loadObjects({
      projectId,
      fieldNames: readerStruct[i].block.getFieldNames(),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;
    fillBuffer(bufferGenerator, readerStruct[i], objects, object => object);

    i += 1;
  }

  const parsePath = path.parse(fileData.path);
  const fileDir = parsePath.dir;

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_SERVER_FOLDER, fileDir),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_SERVER_FOLDER,
      fileDir,
      parsePath.base,
    ),
    bufferGenerator.getBuffer(),
  );
}

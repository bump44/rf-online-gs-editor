import path from 'path';
import gql from 'graphql-tag';
import { pull } from 'lodash';
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {
  ORDER,
  TOTAL_SIZE,
  BLOCK_SIZE,
  OFFSET,
  COUNT,
} from '../../../../classes/constants';
import Struct from '../../../../classes/Struct';
import BufferGenerator from '../../../../classes/BufferGenerator';
import readerStruct from '../../../../structs/client/item/reader_struct';
import { getFiniteByTypeName } from '../../../../structs/item_types_utils';
import apolloClient from '../../../../apollo';
import projectItemsTotalQuery from '../../../../apollo/queries/sub/items_total';
import { getReleaseFilesPath } from '../../../../utils/path';
import { mkdirSync, writeFile } from '../../../../utils/fs';
import { enCryptByBuf } from '../../../../utils/edf';
import {
  RELEASE_FILES_CLIENT_FOLDER,
  RELEASE_FILES_CLIENTDAT_FOLDER,
} from '../../../../utils/constants';

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      items(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          type
          nIndex
          client {
            ${fieldNames instanceof Array ? fieldNames.join('\n') : fieldNames}
          }
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
        sort: { nIndex: 1 },
        where: { type, projectId },
      },
    });

    objects.push(...result.data.items.items);
    nextLoaded += result.data.items.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.items.items.length <= 0) {
      break;
    }
  }

  return objects;
}

/**
 * Export Client Items Resolver
 */
export default function* defaultSaga({ projectId, actions, fileData }) {
  yield delay(1000);
  const parsePath = path.parse(fileData.path);
  const fileName = parsePath.name;
  const fileDir = parsePath.dir;
  const bufferGenerator = new BufferGenerator();

  const total = yield apolloClient.query({
    query: projectItemsTotalQuery,
    variables: { where: { projectId } },
  });

  yield put(actions.changeTotal(total.data.items.total));

  let i = 0;
  let offset = 0;
  let loaded = 0;

  while (readerStruct.length > i) {
    const section = readerStruct[i];
    const { header, type, block } = section;

    const objects = yield loadObjects({
      type,
      projectId,
      fieldNames: pull(block.getFieldNames(), 'nIndex', 'nType'),
      loaded,
      changeLoaded: actions.changeLoaded,
    });

    loaded += objects.length;

    const blockFields = block.getFields();
    const headerFields = header instanceof Struct ? header.getFields() : header;
    const headerWeight = headerFields.reduce(
      (accumulator, field) => accumulator + field.getWeight(),
      0,
    );

    const orderHex = i.toString(16);
    const headerValues = {
      [ORDER]: parseInt(
        `${orderHex.length === 1 ? `0${orderHex}` : orderHex}F1`,
        16,
      ),
      [TOTAL_SIZE]: block.getWeight() * objects.length + 8,
      [BLOCK_SIZE]: block.getWeight(),
      [OFFSET]: offset,
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
      const values = {
        ...object.client,
        nType: getFiniteByTypeName(object.type),
        nIndex: object.nIndex,
        nMoney: null,
      };

      const buffer = new BufferGenerator();
      blockFields.forEach(field => {
        buffer.addByField(field, values[field.getName()], undefined, values);
      });
      buffers.push(buffer.getBuffer());
    });

    bufferGenerator.concat(...buffers);
    offset += headerWeight + headerValues[TOTAL_SIZE] - 8;
    i += 1;
  }

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_CLIENT_FOLDER, fileDir),
  );

  yield mkdirSync(
    getReleaseFilesPath(projectId, RELEASE_FILES_CLIENTDAT_FOLDER, fileDir),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_CLIENTDAT_FOLDER,
      fileDir,
      `${fileName}.dat`,
    ),
    bufferGenerator.getBuffer(),
  );

  yield writeFile(
    getReleaseFilesPath(
      projectId,
      RELEASE_FILES_CLIENT_FOLDER,
      fileDir,
      `${fileName}.edf`,
    ),
    yield enCryptByBuf(bufferGenerator.getBuffer()),
  );
}

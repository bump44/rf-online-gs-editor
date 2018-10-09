import gql from 'graphql-tag';
import { pull } from 'lodash';
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
import * as ITEM_TYPES from '../../../../structs/item_types';
import { getFiniteByTypeName } from '../../../../structs/item_types_utils';
import apolloClient from '../../../../apollo';
import projectItemsTotalQuery from '../../../../apollo/queries/sub/project_items_total';

const TypeToReaderStruct = {};

// generate reader structs
Object.values(ITEM_TYPES).forEach(type => {
  try {
    TypeToReaderStruct[
      type
    ] = require(`../../../../structs/server/item/${type}_reader`).struct; // eslint-disable-line
  } catch (err) {
    console.warn(err); // eslint-disable-line
  }
});

function buildQueryObjects(fieldNames = []) {
  return gql`
    query($take: Int, $skip: Int, $sort: JSON, $where: JSON) {
      projectItems(take: $take, skip: $skip, sort: $sort, where: $where) {
        items {
          id
          type
          nIndex
          server {
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

    objects.push(...result.data.projectItems.items);
    nextLoaded += result.data.projectItems.items.length;

    yield put(changeLoaded(nextLoaded));

    if (result.data.projectItems.items.length <= 0) {
      break;
    }
  }

  return objects;
}

/**
 * Export Server Items Resolver
 */
export default function* defaultSaga({
  projectId,
  // projectExportState,
  actions,
  fileData,
}) {
  yield delay(1000);
  const { type } = fileData.args;
  const readerStruct = TypeToReaderStruct[type];
  const bufferGenerator = new BufferGenerator();
  const total = yield apolloClient.query({
    query: projectItemsTotalQuery,
    variables: { where: { projectId, type } },
  });

  yield put(actions.changeTotal(total.data.projectItems.total));

  let i = 0;
  let loaded = 0;

  while (readerStruct.length > i) {
    const section = readerStruct[i];
    const { header, block } = section;
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
      const values = {
        ...object.client,
        nType: getFiniteByTypeName(object.type),
        nIndex: object.nIndex,
      };

      const buffer = new BufferGenerator();
      blockFields.forEach(field => {
        buffer.addByField(field, values[field.getName()], undefined, values);
      });
      buffers.push(buffer.getBuffer());
    });

    bufferGenerator.concat(...buffers);
    i += 1;
  }

  return {
    buffer: bufferGenerator.getBuffer(),
  };
}

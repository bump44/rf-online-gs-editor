import { BLOCK_SIZE } from 'classes/constants';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import apolloClient from 'apollo';
import chunk from 'lodash/chunk';
import ClientItemNDReader from 'structs/client/itemnd/reader';
import ItemClientNDDescriptionImportBlocksMutation from 'apollo/mutations/item_client_nd_description_import_blocks';
import ItemImportClientNDMutation from 'apollo/mutations/item_import_client_nd';

import { announceProjectCountItems } from '../../actions';

/**
 * Import Client Items Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const fileReader = new ClientItemNDReader({ path: filePath });
  yield call(fileReader.asyncLoadSubclasses.bind(fileReader));
  const sections = yield call(fileReader.getBlocks.bind(fileReader));
  const total = sections.reduce(
    (accumulator, currentValue) => accumulator + currentValue.blocks.length,
    0,
  );
  let countCompleted = 0;

  yield put(actions.changeCountTotal(total));

  let i = 0;
  while (sections.length > i) {
    const section = sections[i];
    const { blocks, type, header } = section;
    const isDescription = /_description$/g.test(type);
    const nBlockSize = header[BLOCK_SIZE] > 0 ? header[BLOCK_SIZE] : 256;
    const nChunkSize = Math.round((260 / nBlockSize) * 50);
    const chunks = chunk(blocks, nChunkSize > 0 ? nChunkSize : 1);

    let t = 0;
    while (chunks.length > t) {
      const result = yield apolloClient.mutate({
        mutation: !isDescription
          ? ItemImportClientNDMutation
          : ItemClientNDDescriptionImportBlocksMutation,
        variables: {
          projectId,
          type: !isDescription
            ? type
            : type.replace(/^(.+)_description$/g, '$1'),
          blocks: chunks[t],
          importType,
        },
      });

      if (!isDescription) {
        yield put(
          announceProjectCountItems({
            count: result.data.itemImportClientND.total,
            id: projectId,
          }),
        );
      }

      countCompleted += chunks[t].length;
      yield put(actions.changeCountCompleted(countCompleted));
      t += 1;
    }
    i += 1;
  }

  return sections;
}

import chunk from 'lodash/chunk';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { COUNT } from '../../../../classes/constants';
import ServerStoreReader from '../../../../structs/server/store/reader';
import apolloClient from '../../../../apollo';
import StoreImportServerMutation from '../../../../apollo/mutations/store_import_server';
import { announceProjectCountStores } from '../../actions';

/**
 * Import Server Stores Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const fileReader = new ServerStoreReader({ path: filePath });
  yield call(fileReader.asyncLoadSubclasses.bind(fileReader));

  const headers = yield call(fileReader.getHeaders.bind(fileReader));
  const total = headers.reduce(
    (accumulator, currentValue) => accumulator + currentValue.header[COUNT],
    0,
  );

  let countCompleted = 0;

  yield put(actions.changeCountTotal(total));
  const sections = yield call(fileReader.getBlocks.bind(fileReader));
  const { blocks } = sections[0];
  const chunks = chunk(blocks, 1);

  let t = 0;
  while (chunks.length > t) {
    const result = yield apolloClient.mutate({
      mutation: StoreImportServerMutation,
      variables: {
        projectId,
        blocks: chunks[t],
        importType,
      },
    });

    yield put(
      announceProjectCountStores({
        count: result.data.storeImportServer.total,
        id: projectId,
      }),
    );

    countCompleted += chunks[t].length;
    yield put(actions.changeCountCompleted(countCompleted));
    t += 1;
  }

  return sections;
}

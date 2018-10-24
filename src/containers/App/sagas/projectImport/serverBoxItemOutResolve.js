import { call, put } from 'redux-saga/effects';
import { COUNT } from '~/classes/constants';
import { delay } from 'redux-saga';
import apolloClient from '~/apollo';
import BoxItemOutImportServerMutation from '~/apollo/mutations/boxItemOut_import_server';
import chunk from 'lodash/chunk';
import ServerBoxItemOutReader from '~/structs/server/boxItemOut/reader';

import { announceProjectCountBoxItemOuts } from '../../actions';

/**
 * Import Server BoxItemOut Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const fileReader = new ServerBoxItemOutReader({ path: filePath });
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
  const chunks = chunk(blocks, 2);

  let t = 0;
  while (chunks.length > t) {
    const result = yield apolloClient.mutate({
      mutation: BoxItemOutImportServerMutation,
      variables: {
        projectId,
        blocks: chunks[t],
        importType,
      },
    });

    yield put(
      announceProjectCountBoxItemOuts({
        count: result.data.boxItemOutImportServer.total,
        id: projectId,
      }),
    );

    countCompleted += chunks[t].length;
    yield put(actions.changeCountCompleted(countCompleted));
    t += 1;
  }

  return sections;
}

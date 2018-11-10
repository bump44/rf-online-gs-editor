import { call, put } from 'redux-saga/effects';
import { COUNT } from '~/classes/constants';
import { delay } from 'redux-saga';
import apolloClient from '~/apollo';
import importServerMutation from '~/apollo/mutations/skillforce_import_server';
import chunk from 'lodash/chunk';
import FileReader from '~/structs/server/potionItemEffect/reader';
import { POTION } from '~/structs/skillforce_types';

/**
 * Import Server PotionItemEffect Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const fileReader = new FileReader({ path: filePath });
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
    yield apolloClient.mutate({
      mutation: importServerMutation,
      variables: {
        projectId,
        blocks: chunks[t],
        type: POTION,
        importType,
      },
    });

    countCompleted += chunks[t].length;
    yield put(actions.changeCountCompleted(countCompleted));
    t += 1;
  }

  return sections;
}

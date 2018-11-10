import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import chunk from 'lodash/chunk';

import { COUNT } from '~/classes/constants';
import apolloClient from '~/apollo';
import Reader from '~/structs/client/skillforce/reader';
import ImportClientMutation from '~/apollo/mutations/skillforce_import_client';

/**
 * Import Client SkillForces Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;

  const fileReader = new Reader({ path: filePath });
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
    const chunks = chunk(blocks, 1);

    let t = 0;
    while (chunks.length > t) {
      yield apolloClient.mutate({
        mutation: ImportClientMutation,
        variables: {
          projectId,
          type,
          blocks: chunks[t],
          importType,
        },
      });

      countCompleted += chunks[t].length;
      yield put(actions.changeCountCompleted(countCompleted));
      t += 1;
    }
    i += 1;
  }

  return sections;
}

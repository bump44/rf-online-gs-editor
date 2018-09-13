import chunk from 'lodash/chunk';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { COUNT } from '../../../../classes/constants';
import ClientItemReader from '../../../../structs/client/item/reader';
import apolloClient from '../../../../apollo';
import projectItemImportClientMutation from '../../../../apollo/mutations/project_item_import_client';
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

  const fileReader = new ClientItemReader({ path: filePath });
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
      const result = yield apolloClient.mutate({
        mutation: projectItemImportClientMutation,
        variables: {
          projectId,
          type,
          blocks: chunks[t],
          importType,
        },
      });

      const nextTotal = result.data.projectItemImportClient.total;
      yield put(announceProjectCountItems({ count: nextTotal, id: projectId }));

      countCompleted += chunks[t].length;
      yield put(actions.changeCountCompleted(countCompleted));
      t += 1;
    }
    i += 1;
  }
}

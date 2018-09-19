import chunk from 'lodash/chunk';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { COUNT, BLOCK_SIZE } from '../../../../classes/constants';
import apolloClient from '../../../../apollo';
import projectItemImportServerMutation from '../../../../apollo/mutations/project_item_import_server';
import { announceProjectCountItems } from '../../actions';
import { FACE, UPPER } from '../../../../structs/item_types';
import ServerItemFaceReader from '../../../../structs/server/item/face_reader';
import ServerItemUpperReader from '../../../../structs/server/item/upper_reader';

const TypeToReader = {
  [FACE]: ServerItemFaceReader,
  [UPPER]: ServerItemUpperReader,
};

/**
 * Import Server Items Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
  fileData,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;
  const { type } = fileData.args;
  const Reader = TypeToReader[type];

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
  const { header } = headers[0];
  const { blocks } = sections[0];
  const nBlockSize = header[BLOCK_SIZE];
  const nChunkSize = Math.round((260 / nBlockSize) * 50);
  const chunks = chunk(blocks, nChunkSize > 0 ? nChunkSize : 1);

  let t = 0;
  while (chunks.length > t) {
    const result = yield apolloClient.mutate({
      mutation: projectItemImportServerMutation,
      variables: {
        projectId,
        type,
        blocks: chunks[t],
        importType,
      },
    });

    const nextTotal = result.data.projectItemImportServer.total;
    yield put(announceProjectCountItems({ count: nextTotal, id: projectId }));

    countCompleted += chunks[t].length;
    yield put(actions.changeCountCompleted(countCompleted));
    t += 1;
  }
}

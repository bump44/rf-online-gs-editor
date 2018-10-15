import chunk from 'lodash/chunk';
import path from 'path';
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { COUNT, BLOCK_SIZE } from '../../../../classes/constants';
import ServerMapactiveReader from '../../../../structs/server/map/active_reader';
import apolloClient from '../../../../apollo';
import projectMapActiveImportServerMutation from '../../../../apollo/mutations/project_mapactive_import_server';

/**
 * Import Server MapActives Resolver
 */
export default function* defaultSaga({
  projectId,
  projectImportState,
  actions,
  mapName,
  activeName,
}) {
  yield delay(1000);
  const state = projectImportState.toJS();
  const { filePath, importType } = state;
  // payloaded or parse from filename
  const mapNameValue =
    mapName ||
    path
      .parse(filePath)
      .dir.split('\\')
      .slice(-1)[0];

  const activeNameValue = activeName || path.parse(filePath).name;

  const fileReader = new ServerMapactiveReader({ path: filePath });
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
    yield apolloClient.mutate({
      mutation: projectMapActiveImportServerMutation,
      variables: {
        projectId,
        blocks: chunks[t],
        importType,
        mapName: mapNameValue,
        activeName: activeNameValue,
      },
    });

    countCompleted += chunks[t].length;
    yield put(actions.changeCountCompleted(countCompleted));
    t += 1;
  }

  return sections;
}

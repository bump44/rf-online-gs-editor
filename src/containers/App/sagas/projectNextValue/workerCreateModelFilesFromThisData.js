import { isString } from 'lodash';
import { fromJS } from 'immutable';
import { put, select, call } from 'redux-saga/effects';
import { copy } from 'fs-extra';
import gql from 'graphql-tag';
import path from 'path';
import apolloClient from '~/apollo';

import {
  projectsNextValuesSubTaskChangeIsProcessing,
  projectsNextValuesSubTaskChangeIsError,
  projectsNextValuesSubTaskChangeErrorMessage,
} from '../../actions/projectsNextValues';

import { makeSelectProjectsNextValues } from '../../selectors';
import { IMMUTABLE_MAP } from '../../constants';

import {
  getType,
  getCode,
  getPath,
  getFileNameBBX,
  getFileNameBN,
  getFileName,
  getOswName1,
  getFileNameIsOsw1,
} from '../../getters/projectResource';

import { isBone, isMesh, isAni } from '~/structs/resource_types_utils';
import { normalizeResourcePath, getWorkdirFileName } from '~/utils/string';
import { getReleaseFilesPath } from '~/utils/path';
import { isExists } from '~/utils/fs';
import { RELEASE_FILES_WORKDIR_FOLDER } from '~/utils/constants';
import { projectsResourcesBindActions } from '../../actions';

export function fetchProject(projectId) {
  return apolloClient
    .query({
      query: gql`
        query($id: String!) {
          project(id: $id) {
            id
            name
          }
        }
      `,
      variables: { id: projectId },
    })
    .then(res => fromJS(res.data.project));
}

export function* takeValidFilePath(paths = []) {
  let i = 0;

  while (paths.length > i) {
    const stat = yield isExists(paths[i]);

    if (stat && stat.isFile()) {
      return paths[i];
    }

    i += 1;
  }

  return null;
}

export function getFilesToCopy({ folderPath, workdirPath, code, files = [] }) {
  return (
    files
      .filter(file => isString(file.name))
      .filter(file => file.name.length > 0)
      .filter(file => /^\..+$/i.test(file.ext))
      .map(file => ({
        ...file,
        name: file.name,
        nextName: `${getOswName1(code)}${file.ext}`.toUpperCase(),
        hash: getWorkdirFileName([folderPath, file.name]),
      }))
      .map(file => ({
        ...file,
        shouldBeHerePaths: [
          path.resolve(workdirPath, folderPath, file.name),
          path.resolve(workdirPath, file.hash),
        ],
        copyToPath: path.resolve(
          workdirPath,
          getWorkdirFileName([folderPath, file.nextName]),
        ),
      }))
      // skip same source to destination
      .filter(file => !getFileNameIsOsw1(file.name, file.nextName))
  );
}

export function* copyFiles({ files = [], entry }) {
  let i = 0;
  while (files.length > i) {
    const fileToCopy = files[i];
    const filePathToCopy = yield takeValidFilePath(
      fileToCopy.shouldBeHerePaths,
    );
    if (filePathToCopy) {
      yield copy(filePathToCopy, fileToCopy.copyToPath);
      yield put(fileToCopy.action(entry, fileToCopy.nextName));
    }
    i += 1;
  }
}

export function* processBone({
  projectNextValue,
  entry,
  workdirPath,
  actions,
}) {
  const code = getCode(projectNextValue, { entry });
  const fileNameBBX = getFileNameBBX(projectNextValue, { entry });
  const fileNameBN = getFileNameBN(projectNextValue, { entry });
  const folderPath = normalizeResourcePath(
    getPath(projectNextValue, { entry }),
  );

  const filesToCopy = getFilesToCopy({
    code,
    folderPath,
    workdirPath,
    files: [
      {
        name: fileNameBBX,
        ext: path.parse(fileNameBBX).ext,
        action: actions.changeFileNameBBX,
      },
      {
        name: fileNameBN,
        ext: path.parse(fileNameBN).ext,
        action: actions.changeFileNameBN,
      },
    ],
  });

  yield call(copyFiles, { files: filesToCopy, entry });
}

export function* processMesh({
  projectNextValue,
  entry,
  workdirPath,
  actions,
}) {
  const code = getCode(projectNextValue, { entry });
  const fileName = getFileName(projectNextValue, { entry });
  const folderPath = normalizeResourcePath(
    getPath(projectNextValue, { entry }),
  );

  const filesToCopy = getFilesToCopy({
    code,
    folderPath,
    workdirPath,
    files: [
      {
        name: fileName,
        ext: path.parse(fileName).ext,
        action: actions.changeFileName,
      },
    ],
  });

  yield call(copyFiles, { files: filesToCopy, entry });
}

export function* processAni(args) {
  return yield call(processMesh, args);
}

export default function* workerCreateModelFilesFromThisData({
  projectId,
  keyId,
  propKey,
  entry,
}) {
  const callAction = (action, value) =>
    action({ projectId, keyId, taskName: propKey }, value);

  try {
    yield put(callAction(projectsNextValuesSubTaskChangeIsError, false));
    yield put(callAction(projectsNextValuesSubTaskChangeIsProcessing, true));

    const projectsNextValues = yield select(makeSelectProjectsNextValues());
    const projectNextValues = projectsNextValues.getIn(
      [projectId, keyId],
      IMMUTABLE_MAP,
    );
    const projectNextValue = projectNextValues.getIn(
      ['nextValue'],
      IMMUTABLE_MAP,
    );

    const type = getType(projectNextValue, { entry });
    const project = yield call(fetchProject, projectId);
    const workdirPath = getReleaseFilesPath(
      project.get('name', projectId),
      RELEASE_FILES_WORKDIR_FOLDER,
    );
    const actions = projectsResourcesBindActions({ projectId });

    const callProps = {
      projectNextValues,
      projectNextValue,
      project,
      projectId,
      entry,
      workdirPath,
      actions,
    };

    if (isBone(type)) {
      yield call(processBone, callProps);
    }

    if (isMesh(type)) {
      yield call(processMesh, callProps);
    }

    if (isAni(type)) {
      yield call(processAni, callProps);
    }

    yield put(callAction(projectsNextValuesSubTaskChangeIsProcessing, false));
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    yield put(
      callAction(projectsNextValuesSubTaskChangeErrorMessage, err.message),
    );
    yield put(callAction(projectsNextValuesSubTaskChangeIsError, true));
    yield put(callAction(projectsNextValuesSubTaskChangeIsProcessing, false));
  }
}

import pull from 'lodash/pull';
import upperFirst from 'lodash/upperFirst';

import {
  SKIP,
  PROJECTS_IMPORTS_START_FILE_IMPORT,
  PROJECTS_IMPORTS_CANCEL_FILE_IMPORT,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
} from '../constants';

/**
 * ProjectsImports Actions
 */

export function projectsImportsStartFileImport({
  projectId,
  fileKey,
  importType = SKIP,
}) {
  return {
    type: PROJECTS_IMPORTS_START_FILE_IMPORT,
    projectId,
    fileKey,
    importType,
  };
}

export function projectsImportsCancelFileImport({ projectId, fileKey }) {
  return {
    type: PROJECTS_IMPORTS_CANCEL_FILE_IMPORT,
    projectId,
    fileKey,
  };
}

export const projectsImports = {
  changePropValue({ projectId, fileKey, propKey, propValue }) {
    return {
      type: PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
      projectId,
      fileKey,
      propKey,
      propValue,
    };
  },
  // generated actions eq. changeFilePath, changeStatus
  ...(() => {
    const propKeys = [
      'filePath',
      'status',
      'errorMessage',
      'countTotal',
      'countCompleted',
      'importType',
    ];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsImports.changePropValue({
          ...args,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsImportsActionNames = pull(
  Object.keys(projectsImports),
  'changePropValue',
);

export const projectsImportsBindActions = ({
  projectId,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsImportsActionNames.forEach(actionKey => {
    const actionFn = projectsImports[actionKey];
    nextFns[actionKey] = (fileKey, propValue) =>
      dispatch(actionFn({ projectId, fileKey, propValue }));
  });
  return nextFns;
};

export const projectsImportsBindActionsWithFileKey = ({
  projectId,
  fileKey,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsImportsActionNames.forEach(actionKey => {
    const actionFn = projectsImports[actionKey];
    nextFns[actionKey] = propValue =>
      dispatch(actionFn({ projectId, fileKey, propValue }));
  });
  return nextFns;
};

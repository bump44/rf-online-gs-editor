import pull from 'lodash/pull';
import upperFirst from 'lodash/upperFirst';

import {
  PROJECTS_EXPORTS_START_FILE_EXPORT,
  PROJECTS_EXPORTS_CANCEL_FILE_EXPORT,
  PROJECTS_EXPORTS_CHANGE_PROP_VALUE,
} from '../constants';

/**
 * ProjectsExports Actions
 */

export function projectsExportsStartFileExport({ projectId, fileKey }) {
  return {
    type: PROJECTS_EXPORTS_START_FILE_EXPORT,
    projectId,
    fileKey,
  };
}

export function projectsExportsCancelFileExport({ projectId, fileKey }) {
  return {
    type: PROJECTS_EXPORTS_CANCEL_FILE_EXPORT,
    projectId,
    fileKey,
  };
}

export const projectsExports = {
  changePropValue({ projectId, fileKey, propKey, propValue }) {
    return {
      type: PROJECTS_EXPORTS_CHANGE_PROP_VALUE,
      projectId,
      fileKey,
      propKey,
      propValue,
    };
  },
  // generated actions eq. changeFilePath, changeStatus
  ...(() => {
    const propKeys = ['status', 'errorMessage', 'total', 'loaded'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsExports.changePropValue({
          ...args,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsExportsActionNames = pull(
  Object.keys(projectsExports),
  'changePropValue',
);

export const projectsExportsBindActions = ({
  projectId,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsExportsActionNames.forEach(actionKey => {
    const actionFn = projectsExports[actionKey];
    nextFns[actionKey] = (fileKey, propValue) =>
      dispatch(actionFn({ projectId, fileKey, propValue }));
  });
  return nextFns;
};

export const projectsExportsBindActionsWithFileKey = ({
  projectId,
  fileKey,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsExportsActionNames.forEach(actionKey => {
    const actionFn = projectsExports[actionKey];
    nextFns[actionKey] = propValue =>
      dispatch(actionFn({ projectId, fileKey, propValue }));
  });
  return nextFns;
};

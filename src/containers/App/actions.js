import pull from 'lodash/pull';

import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
} from './constants';

export function changeCurrentUser(user) {
  return {
    type: CHANGE_CURRENT_USER,
    user,
  };
}

export function changeCurrentUserToken(token) {
  return {
    type: CHANGE_CURRENT_USER_TOKEN,
    token,
  };
}

export function logoutCurrentUser() {
  return {
    type: LOGOUT_CURRENT_USER,
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
  changeStatus(args) {
    return projectsImports.changePropValue({
      ...args,
      propKey: 'status',
    });
  },
  changeImportType(args) {
    return projectsImports.changePropValue({
      ...args,
      propKey: 'importType',
    });
  },
};

export const projectsImportsActionNames = pull(
  Object.keys(projectsImports),
  'changePropValue',
);

export const projectsImportsBindActions = ({ projectId, dispatch }) => {
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
  dispatch,
}) => {
  const nextFns = {};
  projectsImportsActionNames.forEach(actionKey => {
    const actionFn = projectsImports[actionKey];
    nextFns[actionKey] = propValue =>
      dispatch(actionFn({ projectId, fileKey, propValue }));
  });
  return nextFns;
};

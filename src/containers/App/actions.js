import pull from 'lodash/pull';
import upperFirst from 'lodash/upperFirst';

import {
  CHANGE_CURRENT_USER,
  CHANGE_CURRENT_USER_TOKEN,
  LOGOUT_CURRENT_USER,
  PROJECTS_IMPORTS_CHANGE_PROP_VALUE,
  PROJECTS_IMPORTS_START_FILE_IMPORT,
  PROJECTS_IMPORTS_CANCEL_FILE_IMPORT,
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
  PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
  PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
  SKIP,
  ITEM,
  STORE,
} from './constants';

/**
 * Announces Actions
 */

export function announceProjectCountItems({ count, id }) {
  return {
    type: ANNOUNCE_PROJECT_COUNT_ITEMS,
    count,
    id,
  };
}

export function announceProjectCountStores({ count, id }) {
  return {
    type: ANNOUNCE_PROJECT_COUNT_STORES,
    count,
    id,
  };
}

/**
 * Current User Actions
 */

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

/**
 * ProjectsNextValues Actions
 */
export function projectsNextValuesChangePropValue({
  projectId,
  item,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
    projectId,
    item,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

export function projectsNextValuesChangeIsSaving(
  { projectId, keyId },
  isSaving,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
    projectId,
    keyId,
    isSaving,
  };
}

export function projectsNextValuesChangeIsSaved({ projectId, keyId }, isSaved) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
    projectId,
    keyId,
    isSaved,
  };
}

export function projectsNextValuesChangeIsError({ projectId, keyId }, isError) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
    projectId,
    keyId,
    isError,
  };
}

export function projectsNextValuesChangeErrorMessage(
  { projectId, keyId },
  errorMessage,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
    projectId,
    keyId,
    errorMessage,
  };
}

export function projectsNextValuesChangeNextValue(
  { projectId, keyId, subType },
  nextValue,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
    projectId,
    keyId,
    nextValue,
    subType,
  };
}

/**
 * ProjectsItems Actions
 */
export const projectsItems = {
  // generated actions eq. changeName, changeItemGrade
  ...(() => {
    const propKeys = [
      'name',
      'exchange',
      'sell',
      'ground',
      'storagePossible',
      'money',
      'stdPrice',
      'stdPoint',
      'goldPoint',
      'procPoint',
      'killPoint',
      'storagePrice',
      'itemGrade',
      'levelLim',
      'upLevelLim',
      'defence',
      'defenceGap',
      'defenceFacing',
      'wpType',
      'subType',
      'civilBM',
      'civilBF',
      'civilCM',
      'civilCF',
      'civilA',
    ];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: ITEM,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsItemsActionNames = Object.keys(projectsItems);

export const projectsItemsBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsItemsActionNames.forEach(actionKey => {
    const actionFn = projectsItems[actionKey];
    nextFns[actionKey] = (item, propValue, someAdditionalData = {}) =>
      dispatch(
        actionFn({
          projectId,
          item,
          propValue,
          additionalData: {
            ...additionalData,
            ...someAdditionalData,
          },
        }),
      );
  });
  return nextFns;
};

/**
 * ProjectsStores Actions
 */
export const projectsStores = {
  // generated actions eq. changeName, changeItemGrade
  ...(() => {
    const propKeys = [
      'name',
      'lastName',
      'trade',
      'useAngle',
      'size',
      'angle',
      'itemsListCount',
    ];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: STORE,
          propKey,
        });
    });
    return fns;
  })(),
  itemListUpdate: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'itemListUpdate',
    }),
  itemListRemove: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'itemListRemove',
    }),
  itemsListResort: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'itemsListResort',
    }),
  itemsListReshuffle: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'itemsListReshuffle',
    }),
};

export const projectsStoresActionNames = Object.keys(projectsStores);

export const projectsStoresBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsStoresActionNames.forEach(actionKey => {
    const actionFn = projectsStores[actionKey];
    nextFns[actionKey] = (item, propValue, someAdditionalData = {}) =>
      dispatch(
        actionFn({
          projectId,
          item,
          propValue,
          additionalData: {
            ...additionalData,
            ...someAdditionalData,
          },
        }),
      );
  });
  return nextFns;
};

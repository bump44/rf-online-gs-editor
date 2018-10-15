import pull from 'lodash/pull';
import upperFirst from 'lodash/upperFirst';

import {
  SKIP,
  PROJECTS_IMPORTS_SERVER_MAPS_START_MAP_IMPORT,
  PROJECTS_IMPORTS_SERVER_MAPS_CANCEL_MAP_IMPORT,
  PROJECTS_IMPORTS_SERVER_MAPS_CHANGE_PROP_VALUE,
  PROJECTS_IMPORTS_SERVER_MAPS_REMOVE,
} from '../constants';

/**
 * ProjectsImportsServerMaps Actions
 */

export function projectsImportsServerMapsStartMapImport({
  projectId,
  mapName,
  importType = SKIP,
}) {
  return {
    type: PROJECTS_IMPORTS_SERVER_MAPS_START_MAP_IMPORT,
    projectId,
    mapName,
    importType,
  };
}

export function projectsImportsServerMapsCancelMapImport({
  projectId,
  mapName,
}) {
  return {
    type: PROJECTS_IMPORTS_SERVER_MAPS_CANCEL_MAP_IMPORT,
    projectId,
    mapName,
  };
}

export const projectsImportsServerMaps = {
  changePropValue({ projectId, mapName, propKey, propValue }) {
    return {
      type: PROJECTS_IMPORTS_SERVER_MAPS_CHANGE_PROP_VALUE,
      projectId,
      mapName,
      propKey,
      propValue,
    };
  },
  add(args) {
    return projectsImportsServerMaps.changePropValue({
      ...args,
      propKey: 'mapPath',
    });
  },
  remove(args) {
    return { type: PROJECTS_IMPORTS_SERVER_MAPS_REMOVE, ...args };
  },
  // generated actions eq. changeMapPath, changeStatus
  ...(() => {
    const propKeys = [
      'mapPath',
      'status',
      'errorMessage',
      'countTotal',
      'countCompleted',
      'importType',
      'message',
    ];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsImportsServerMaps.changePropValue({
          ...args,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsImportsServerMapsActionNames = pull(
  Object.keys(projectsImportsServerMaps),
  'changePropValue',
);

export const projectsImportsServerMapsBindActions = ({
  projectId,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsImportsServerMapsActionNames.forEach(actionKey => {
    const actionFn = projectsImportsServerMaps[actionKey];
    nextFns[actionKey] = (mapName, propValue) =>
      dispatch(actionFn({ projectId, mapName, propValue }));
  });
  return nextFns;
};

export const projectsImportsServerMapsBindActionsWithMapName = ({
  projectId,
  mapName,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsImportsServerMapsActionNames.forEach(actionKey => {
    const actionFn = projectsImportsServerMaps[actionKey];
    nextFns[actionKey] = propValue =>
      dispatch(actionFn({ projectId, mapName, propValue }));
  });
  return nextFns;
};

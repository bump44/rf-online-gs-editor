import pull from 'lodash/pull';
import upperFirst from 'lodash/upperFirst';

import {
  WAITING,
  PROJECTS_EXPORTS_SERVER_MAPS_START_MAP_EXPORT,
  PROJECTS_EXPORTS_SERVER_MAPS_CANCEL_MAP_EXPORT,
  PROJECTS_EXPORTS_SERVER_MAPS_CHANGE_PROP_VALUE,
  PROJECTS_EXPORTS_SERVER_MAPS_REMOVE,
} from '../constants';

/**
 * ProjectsExportsServerMaps Actions
 */

export function projectsExportsServerMapsStartMapExport({
  projectId,
  mapName,
}) {
  return {
    type: PROJECTS_EXPORTS_SERVER_MAPS_START_MAP_EXPORT,
    projectId,
    mapName,
  };
}

export function projectsExportsServerMapsCancelMapExport({
  projectId,
  mapName,
}) {
  return {
    type: PROJECTS_EXPORTS_SERVER_MAPS_CANCEL_MAP_EXPORT,
    projectId,
    mapName,
  };
}

export const projectsExportsServerMaps = {
  changePropValue({ projectId, mapName, propKey, propValue }) {
    return {
      type: PROJECTS_EXPORTS_SERVER_MAPS_CHANGE_PROP_VALUE,
      projectId,
      mapName,
      propKey,
      propValue,
    };
  },
  // mapName is required
  add(args) {
    return projectsExportsServerMaps.changePropValue({
      ...args,
      propValue: args.propValue || WAITING,
      propKey: 'status',
    });
  },
  remove(args) {
    return { type: PROJECTS_EXPORTS_SERVER_MAPS_REMOVE, ...args };
  },
  // generated actions eq. changeMapPath, changeStatus
  ...(() => {
    const propKeys = ['status', 'errorMessage', 'message', 'loaded', 'total'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsExportsServerMaps.changePropValue({
          ...args,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsExportsServerMapsActionNames = pull(
  Object.keys(projectsExportsServerMaps),
  'changePropValue',
);

export const projectsExportsServerMapsBindActions = ({
  projectId,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsExportsServerMapsActionNames.forEach(actionKey => {
    const actionFn = projectsExportsServerMaps[actionKey];
    nextFns[actionKey] = (mapName, propValue) =>
      dispatch(actionFn({ projectId, mapName, propValue }));
  });
  return nextFns;
};

export const projectsExportsServerMapsBindActionsWithMapName = ({
  projectId,
  mapName,
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsExportsServerMapsActionNames.forEach(actionKey => {
    const actionFn = projectsExportsServerMaps[actionKey];
    nextFns[actionKey] = propValue =>
      dispatch(actionFn({ projectId, mapName, propValue }));
  });
  return nextFns;
};

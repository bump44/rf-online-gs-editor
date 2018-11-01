import upperFirst from 'lodash/upperFirst';

import { RESOURCE } from '../constants';

import {
  projectsNextValuesChangePropValue,
  projectsNextValuesCreateModelFilesFromThisData,
} from './projectsNextValues';

/**
 * ProjectsResources Actions
 */

export const projectsResources = {
  // generated actions eq. changeCode, changePath
  ...(() => {
    const propKeys = ['fileNameBBX', 'fileNameBN', 'fileName', 'code2'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: RESOURCE,
          propKey,
        });
    });
    return fns;
  })(),
  createModelFilesFromThisData: args =>
    projectsNextValuesCreateModelFilesFromThisData({
      ...args,
      subType: RESOURCE,
      propKey: 'createModelFilesFromThisData',
    }),
};

export const projectsResourcesActionNames = Object.keys(projectsResources);

export const projectsResourcesBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsResourcesActionNames.forEach(actionKey => {
    const actionFn = projectsResources[actionKey];
    nextFns[actionKey] = (entry, propValue, someAdditionalData = {}) =>
      dispatch(
        actionFn({
          projectId,
          entry,
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

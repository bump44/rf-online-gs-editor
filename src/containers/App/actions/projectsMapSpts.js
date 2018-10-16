import upperFirst from 'lodash/upperFirst';
import { MAPSPT } from '../constants';
import {
  projectsNextValuesChangePropValue,
  projectsNextValuesRemoveFully,
} from './projectsNextValues';

/**
 * ProjectsMapSpts Actions
 */

export const projectsMapSpts = {
  // generated actions eq. changeA1, changeA2
  ...(() => {
    const propKeys = [];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: MAPSPT,
          propKey,
        });
    });
    return fns;
  })(),
  removeFully: args =>
    projectsNextValuesRemoveFully({
      ...args,
      subType: MAPSPT,
      propKey: 'removeFully',
    }),
};

export const projectsMapSptsActionNames = Object.keys(projectsMapSpts);

export const projectsMapSptsBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsMapSptsActionNames.forEach(actionKey => {
    const actionFn = projectsMapSpts[actionKey];
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

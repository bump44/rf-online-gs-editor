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
    const propKeys = [
      'a1',
      'a2',
      'a3',
      'a4',
      'a5',
      'a6',
      'b1',
      'b2',
      'b3',
      'b4',
      'c1',
      'c2',
      'c3',
      'c4',
      'd1',
      'd2',
      'd3',
      'd4',
      'e1',
      'e2',
      'e3',
      'e4',
    ];
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

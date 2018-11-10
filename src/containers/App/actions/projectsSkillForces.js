import upperFirst from 'lodash/upperFirst';

import { SKILLFORCE } from '../constants';
import { projectsNextValuesChangePropValue } from './projectsNextValues';

/**
 * ProjectsSkillForces Actions
 */

export const projectsSkillForces = {
  // generated actions eq. changeActivate
  ...(() => {
    const propKeys = ['activate'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: SKILLFORCE,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsSkillForcesActionNames = Object.keys(projectsSkillForces);

export const projectsSkillForcesBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsSkillForcesActionNames.forEach(actionKey => {
    const actionFn = projectsSkillForces[actionKey];
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

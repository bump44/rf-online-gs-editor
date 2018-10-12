import upperFirst from 'lodash/upperFirst';
import { BOXITEMOUT } from '../constants';
import { projectsNextValuesChangePropValue } from './projectsNextValues';

/**
 * ProjectsBoxItemOuts Actions
 */

export const projectsBoxItemOuts = {
  // generated actions eq. changeName
  ...(() => {
    const propKeys = ['outputCode', 'outputCount', 'outputProb', 'outputItem'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: BOXITEMOUT,
          propKey,
        });
    });
    return fns;
  })(),
  outputUpdate: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: BOXITEMOUT,
      propKey: 'outputUpdate',
    }),
  outputDisable: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: BOXITEMOUT,
      propKey: 'outputDisable',
    }),
};

export const projectsBoxItemOutsActionNames = Object.keys(projectsBoxItemOuts);

export const projectsBoxItemOutsBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsBoxItemOutsActionNames.forEach(actionKey => {
    const actionFn = projectsBoxItemOuts[actionKey];
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

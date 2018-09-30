import upperFirst from 'lodash/upperFirst';
import { BOX_ITEM_OUT } from '../constants';
import { projectsNextValuesChangePropValue } from './projectsNextValues';

/**
 * ProjectsBoxItemOuts Actions
 */

export const projectsBoxItemOuts = {
  // generated actions eq. changeName
  ...(() => {
    const propKeys = [];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: BOX_ITEM_OUT,
          propKey,
        });
    });
    return fns;
  })(),
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

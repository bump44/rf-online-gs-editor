import upperFirst from 'lodash/upperFirst';
import { projectsNextValuesChangePropValue } from './projectsNextValues';
import { STORE } from '../constants';

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

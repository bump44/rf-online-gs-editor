import upperFirst from 'lodash/upperFirst';

import {
  projectsNextValuesChangePropValue,
  projectsNextValuesCopyAndRedirect,
} from './projectsNextValues';
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
      'npcClass',
      'mapCode',
      'itemsListCount',
      'itemListServerCode',
      'itemListClientCode',
      'itemListClientType',
      'limItemsListCount',
      'limItemListServerCode',
      'limItemListClientCode',
      'limItemListClientType',
      'limItemListMaxCount',
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
  limItemListUpdate: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'limItemListUpdate',
    }),
  limItemListRemove: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'limItemListRemove',
    }),
  limItemsListResort: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'limItemsListResort',
    }),
  limItemsListReshuffle: args =>
    projectsNextValuesChangePropValue({
      ...args,
      subType: STORE,
      propKey: 'limItemsListReshuffle',
    }),
  copyAndRedirect: args =>
    projectsNextValuesCopyAndRedirect({
      ...args,
      subType: STORE,
      propKey: 'copyAndRedirect',
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

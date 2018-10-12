import upperFirst from 'lodash/upperFirst';
import { ITEM } from '../constants';
import { projectsNextValuesChangePropValue } from './projectsNextValues';

/**
 * ProjectsItems Actions
 */

export const projectsItems = {
  // generated actions eq. changeName, changeItemGrade
  ...(() => {
    const propKeys = [
      'name',
      'exchange',
      'sell',
      'ground',
      'storagePossible',
      'money',
      'stdPrice',
      'stdPoint',
      'goldPoint',
      'procPoint',
      'killPoint',
      'storagePrice',
      'itemGrade',
      'levelLim',
      'upLevelLim',
      'defence',
      'defenceGap',
      'defenceFacing',
      'wpType',
      'subType',
      'civilBM',
      'civilBF',
      'civilCM',
      'civilCF',
      'civilA',
      'expertTypeValue',
      'expertValue',
      'effectTypeValue',
      'effectValue',
    ];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: ITEM,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsItemsActionNames = Object.keys(projectsItems);

export const projectsItemsBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsItemsActionNames.forEach(actionKey => {
    const actionFn = projectsItems[actionKey];
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

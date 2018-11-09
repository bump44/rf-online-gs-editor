import upperFirst from 'lodash/upperFirst';

import { POTIONITEMEFFECT } from '../constants';
import { projectsNextValuesChangePropValue } from './projectsNextValues';

/**
 * ProjectsPotionItemEffects Actions
 */

export const projectsPotionItemEffects = {
  // generated actions eq. changeActivate
  ...(() => {
    const propKeys = ['activate'];
    const fns = {};
    propKeys.forEach(propKey => {
      fns[`change${upperFirst(propKey)}`] = args =>
        projectsNextValuesChangePropValue({
          ...args,
          subType: POTIONITEMEFFECT,
          propKey,
        });
    });
    return fns;
  })(),
};

export const projectsPotionItemEffectsActionNames = Object.keys(
  projectsPotionItemEffects,
);

export const projectsPotionItemEffectsBindActions = ({
  projectId,
  additionalData = {},
  dispatch = args => args,
}) => {
  const nextFns = {};
  projectsPotionItemEffectsActionNames.forEach(actionKey => {
    const actionFn = projectsPotionItemEffects[actionKey];
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

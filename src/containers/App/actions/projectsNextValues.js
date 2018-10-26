import {
  PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
  PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL,
  PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING,
  PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING,
  PROJECTS_NEXT_VALUES_RESTORE_VIRTUAL,
  PROJECTS_NEXT_VALUES_REMOVE_FULLY,
  PROJECTS_NEXT_VALUES_COPY_AND_REDIRECT,
} from '../constants';

/**
 * ProjectsNextValues Actions
 */
export function projectsNextValuesChangePropValue({
  projectId,
  entry,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
    projectId,
    entry,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

export function projectsNextValuesChangeIsSaving(
  { projectId, keyId },
  isSaving,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
    projectId,
    keyId,
    isSaving,
  };
}

export function projectsNextValuesChangeIsSaved({ projectId, keyId }, isSaved) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
    projectId,
    keyId,
    isSaved,
  };
}

export function projectsNextValuesChangeIsError({ projectId, keyId }, isError) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
    projectId,
    keyId,
    isError,
  };
}

export function projectsNextValuesChangeIsRemoving(
  { projectId, keyId },
  isRemoving,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_REMOVING,
    projectId,
    keyId,
    isRemoving,
  };
}

export function projectsNextValuesChangeIsRestoring(
  { projectId, keyId },
  isRestoring,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_RESTORING,
    projectId,
    keyId,
    isRestoring,
  };
}

export function projectsNextValuesChangeIsCopying(
  { projectId, keyId },
  isCopying,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_IS_COPYING,
    projectId,
    keyId,
    isCopying,
  };
}

export function projectsNextValuesChangeErrorMessage(
  { projectId, keyId },
  errorMessage,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
    projectId,
    keyId,
    errorMessage,
  };
}

export function projectsNextValuesChangeNextValue(
  { projectId, keyId, subType },
  nextValue,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
    projectId,
    keyId,
    nextValue,
    subType,
  };
}

export function projectsNextValuesChangeNextValueOnlyInState(
  { projectId, keyId, subType },
  nextValue,
) {
  return {
    type: PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE_ONLY_IN_STATE,
    projectId,
    keyId,
    nextValue,
    subType,
  };
}

export function projectsNextValuesRemoveVirtual({
  projectId,
  entry,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_REMOVE_VIRTUAL,
    projectId,
    entry,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

export function projectsNextValuesRemoveFully({
  projectId,
  entry,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_REMOVE_FULLY,
    projectId,
    entry,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

export function projectsNextValuesRestoreVirtual({
  projectId,
  entry,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_RESTORE_VIRTUAL,
    projectId,
    entry,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

export function projectsNextValuesCopyAndRedirect({
  projectId,
  entry,
  propKey,
  propValue,
  additionalData = {},
  subType,
}) {
  return {
    type: PROJECTS_NEXT_VALUES_COPY_AND_REDIRECT,
    projectId,
    entry,
    propKey,
    propValue,
    additionalData,
    subType,
  };
}

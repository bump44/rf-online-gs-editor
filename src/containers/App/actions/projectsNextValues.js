import {
  PROJECTS_NEXT_VALUES_CHANGE_ERROR_MESSAGE,
  PROJECTS_NEXT_VALUES_CHANGE_NEXT_VALUE,
  PROJECTS_NEXT_VALUES_CHANGE_IS_ERROR,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVED,
  PROJECTS_NEXT_VALUES_CHANGE_IS_SAVING,
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
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

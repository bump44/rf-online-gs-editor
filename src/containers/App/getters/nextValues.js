import { isBoolean, isString } from 'lodash';
import { IMMUTABLE_MAP } from '../constants';

const ICONS = {
  ERROR: 'times',
  LOADING: 'spinner',
  WAITTOSAVE: 'pencil',
  OKORSAVED: 'check',
};

const COLORS = {
  ERROR: 'red',
  SAVING: 'yellow',
  SAVED: 'green',
  WAITTOSAVE: 'pink',
  DEFAULT: 'teal',
};

export const getIconName = (nextValues = IMMUTABLE_MAP) => {
  const isSaved = nextValues.get('isSaved');
  const isSaving = nextValues.get('isSaving');
  const isError = nextValues.get('isError');

  if (isError) {
    return ICONS.ERROR;
  }

  if (!isSaving && isSaved === false) {
    return ICONS.WAITTOSAVE;
  }

  if (isSaving) {
    return ICONS.LOADING;
  }

  return ICONS.OKORSAVED;
};

export const getStatusColor = (nextValues = IMMUTABLE_MAP) => {
  const isSaved = nextValues.get('isSaved');
  const isSaving = nextValues.get('isSaving');
  const isError = nextValues.get('isError');

  if (isError) {
    return COLORS.ERROR;
  }

  if (isSaving) {
    return COLORS.SAVING;
  }

  if (!isSaving && isSaved === false) {
    return COLORS.WAITTOSAVE;
  }

  if (isSaved) {
    return COLORS.SAVED;
  }

  return COLORS.DEFAULT;
};

export const getSubTaskIsProcessing = (nextValues = IMMUTABLE_MAP, action) => {
  const taskName = action;

  if (typeof taskName !== 'string') {
    return false;
  }

  const value = nextValues.getIn(['subTasks', taskName, 'isProcessing']);

  if (isBoolean(value)) {
    return value;
  }

  return false;
};

export const getSubTaskIsError = (nextValues = IMMUTABLE_MAP, action) => {
  const taskName = action;

  if (typeof taskName !== 'string') {
    return false;
  }

  const value = nextValues.getIn(['subTasks', taskName, 'isError']);

  if (isBoolean(value)) {
    return value;
  }

  return false;
};

export const getSubTaskErrorMessage = (nextValues = IMMUTABLE_MAP, action) => {
  const taskName = action;

  if (typeof taskName !== 'string') {
    return '';
  }

  const value = nextValues.getIn(['subTasks', taskName, 'errorMessage']);

  if (isString(value)) {
    return value;
  }

  return '';
};

export const getSubTask = (nextValues, action) => ({
  isProcessing: getSubTaskIsProcessing(nextValues, action),
  isError: getSubTaskIsError(nextValues, action),
  errorMessage: getSubTaskErrorMessage(nextValues, action),
});

export const getNextValues = (nextValues, entry = IMMUTABLE_MAP) =>
  nextValues.get(entry.get('id'), IMMUTABLE_MAP);

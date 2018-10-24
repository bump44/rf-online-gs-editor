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

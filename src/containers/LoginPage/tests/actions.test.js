import {
  defaultAction,
  changeFieldValue,
  changeIdent,
  changePassword,
  changeIsLoading,
  changeIsError,
  changeErrorMessage,
  submit,
} from '../actions';

import { DEFAULT_ACTION, CHANGE_FIELD_VALUE, SUBMIT } from '../constants';

describe('LoginPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Change Field Value Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'key',
        value: 'value',
      };
      expect(changeFieldValue('key', 'value')).toEqual(expected);
    });
  });
  describe('Change Ident Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'ident',
        value: 'value',
      };
      expect(changeIdent('value')).toEqual(expected);
    });
  });
  describe('Change Password Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'password',
        value: 'value',
      };
      expect(changePassword('value')).toEqual(expected);
    });
  });
  describe('Change IsLoading Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'isLoading',
        value: true,
      };
      expect(changeIsLoading(true)).toEqual(expected);
    });
  });
  describe('Change IsError Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'isError',
        value: false,
      };
      expect(changeIsError(false)).toEqual(expected);
    });
  });
  describe('Change ErrorMessage Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: CHANGE_FIELD_VALUE,
        key: 'errorMessage',
        value: 'value',
      };
      expect(changeErrorMessage('value')).toEqual(expected);
    });
  });
  describe('Submit Action', () => {
    it('has a type of CHANGE_FIELD_VALUE', () => {
      const expected = {
        type: SUBMIT,
      };
      expect(submit()).toEqual(expected);
    });
  });
});

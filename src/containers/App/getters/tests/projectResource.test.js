import immutable from 'immutable';

import {
  getType,
  getCode,
  getFileNameBBX,
  getFileNameBN,
  getPath,
} from '../projectResource';

describe('App getters', () => {
  describe('projectResource', () => {
    // getType
    it('getType should return default empty string', () => {
      expect(getType()).toEqual('');
      expect(
        getType(undefined, { entry: immutable.Map({ type: 10 }) }),
      ).toEqual('');
    });
    it('getType should return type', () => {
      expect(
        getType(undefined, { entry: immutable.Map({ type: 'type' }) }),
      ).toEqual('type');
    });

    // getCode
    it('getCode should return default empty string', () => {
      expect(getCode()).toEqual('');
      expect(
        getCode(undefined, { entry: immutable.Map({ strCode: 10 }) }),
      ).toEqual('');
    });
    it('getCode should return strCode', () => {
      expect(
        getCode(undefined, { entry: immutable.Map({ strCode: 'strCode' }) }),
      ).toEqual('strCode');
    });

    // getFileNameBBX
    it('getFileNameBBX should return default empty string', () => {
      expect(getFileNameBBX()).toEqual('');
      expect(
        getFileNameBBX(undefined, {
          entry: immutable.Map({ strFileNameBBX: 10 }),
        }),
      ).toEqual('');
    });
    it('getFileNameBBX should return strFileNameBBX', () => {
      expect(
        getFileNameBBX(undefined, {
          entry: immutable.Map({ strFileNameBBX: 'strFileNameBBX' }),
        }),
      ).toEqual('strFileNameBBX');
    });

    // getFileNameBN
    it('getFileNameBN should return default empty string', () => {
      expect(getFileNameBN()).toEqual('');
      expect(
        getFileNameBN(undefined, {
          entry: immutable.Map({ strFileNameBN: 10 }),
        }),
      ).toEqual('');
    });
    it('getFileNameBN should return strFileNameBN', () => {
      expect(
        getFileNameBN(undefined, {
          entry: immutable.Map({ strFileNameBN: 'strFileNameBN' }),
        }),
      ).toEqual('strFileNameBN');
    });

    // getPath
    it('getPath should return default empty string', () => {
      expect(getPath()).toEqual('');
      expect(
        getPath(undefined, {
          entry: immutable.Map({ strPath: 10 }),
        }),
      ).toEqual('');
    });
    it('getPath should return strPath', () => {
      expect(
        getPath(undefined, { entry: immutable.Map({ strPath: 'strPath' }) }),
      ).toEqual('strPath');
    });
  });
});

import {
  FILES,
  FILE_TYPES,
  RESOLVERS,
  CLIENT_FILES,
  CLIENT_ND_FILES,
  SERVER_FILES,
  SERVER_STR_FILES,
  SERVER_MAP_FILES,
} from '../gameFiles';

import * as itemTypes from '../../structs/item_types';

describe('gameFiles', () => {
  it('should is valid', () => {
    const resolvers = Object.values(RESOLVERS);
    const fileTypes = Object.values(FILE_TYPES);
    const itemTypeNames = Object.values(itemTypes);
    Object.keys(FILES).forEach(key => {
      const file = FILES[key];
      expect(file.path.length > 0).toBeTruthy();
      expect(resolvers.includes(file.resolve)).toBeTruthy();
      expect(fileTypes.includes(file.type)).toBeTruthy();
      expect(file.extensions).toBeInstanceOf(Array);

      if (file.args !== undefined) {
        expect(file.args).toBeInstanceOf(Object);
        if (file.args.type !== undefined) {
          expect(itemTypeNames.includes(file.args.type)).toBeTruthy();
        }
      }
    });
  });
  it('should exist', () => {
    expect(CLIENT_FILES).toBeDefined();
    expect(CLIENT_ND_FILES).toBeDefined();
    expect(SERVER_FILES).toBeDefined();
    expect(SERVER_STR_FILES).toBeDefined();
    expect(SERVER_MAP_FILES).toBeDefined();
  });
});

import * as itemTypes from '../item_types';

describe('Structs', () => {
  describe('ItemTypes', () => {
    it('should have itemTypes', () => {
      expect(itemTypes).toMatchSnapshot();
    });
  });
});

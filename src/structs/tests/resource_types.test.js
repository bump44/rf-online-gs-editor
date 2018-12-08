import * as resourceTypes from '../resource_types';

describe('Structs', () => {
  describe('ResourceTypes', () => {
    it('should have resourceTypes', () => {
      expect(resourceTypes).toMatchSnapshot();
    });
  });
});

import * as skillforceTypes from '../skillforce_types';

describe('Structs', () => {
  describe('SkillforceTypes', () => {
    it('should have skillforceTypes', () => {
      expect(skillforceTypes).toMatchSnapshot();
    });
  });
});

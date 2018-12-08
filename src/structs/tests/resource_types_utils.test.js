import {
  BONE_TYPES,
  MESH_TYPES,
  ANI_TYPES,
  isBone,
  isMesh,
  isAni,
} from '../resource_types_utils';

describe('Structs', () => {
  describe('ResourceTypesUtils', () => {
    it('should have boneTypes', () => {
      expect(BONE_TYPES).toMatchSnapshot();
    });
    it('should have meshTypes', () => {
      expect(MESH_TYPES).toMatchSnapshot();
    });
    it('should have aniTypes', () => {
      expect(ANI_TYPES).toMatchSnapshot();
    });
    it('should check isBone/isMesh/isAni', () => {
      [...BONE_TYPES, MESH_TYPES, ANI_TYPES].forEach(type => {
        expect(isBone(type)).toBe(BONE_TYPES.indexOf(type) !== -1);
        expect(isMesh(type)).toBe(MESH_TYPES.indexOf(type) !== -1);
        expect(isAni(type)).toBe(ANI_TYPES.indexOf(type) !== -1);
      });
    });
  });
});

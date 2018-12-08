import {
  PREFIXES,
  FINITES,
  CONV_DECIMALS,
  getFiniteByTypeName,
  getTypeNameByFinite,
  getPrefixByTypeName,
  getTypeNamesByPrefix,
  getConvDecimalByTypeName,
} from '../item_types_utils';

describe('Structs', () => {
  describe('ItemTypesUtils', () => {
    it('should have prefixes', () => {
      expect(PREFIXES).toMatchSnapshot();
    });
    it('should have finites', () => {
      expect(FINITES).toMatchSnapshot();
    });
    it('should have convDecimals', () => {
      expect(CONV_DECIMALS).toMatchSnapshot();
    });
    it('should return finite by typeName', () => {
      expect(getFiniteByTypeName('upper')).toEqual(1);
      expect(getFiniteByTypeName('cloak')).toEqual(8);
      expect(getFiniteByTypeName('___undefined___')).toEqual(undefined);
    });
    it('should return typeName by finite', () => {
      expect(getTypeNameByFinite(1)).toEqual('upper');
      expect(getTypeNameByFinite(8)).toEqual('cloak');
      expect(getTypeNameByFinite('___undefined___')).toEqual(undefined);
    });
    it('should return prefix by typeName', () => {
      expect(getPrefixByTypeName('upper')).toEqual('iu');
      expect(getPrefixByTypeName('cloak')).toEqual('ik');
      expect(getPrefixByTypeName('___undefined___')).toEqual(undefined);
    });
    it('should return typeNames by prefix', () => {
      expect(getTypeNamesByPrefix('iu')).toMatchSnapshot();
      expect(getTypeNamesByPrefix('ik')).toMatchSnapshot();
      expect(getTypeNamesByPrefix('un')).toMatchSnapshot();
      expect(getTypeNamesByPrefix('___undefined___')).toEqual([]);
    });
    it('should return typeNames by prefix', () => {
      expect(getConvDecimalByTypeName('upper')).toEqual(192);
      expect(getConvDecimalByTypeName('cloak')).toEqual(192);
      expect(getConvDecimalByTypeName('coupon')).toEqual(96);
      expect(getConvDecimalByTypeName('___undefined___')).toEqual(undefined);
    });
  });
});

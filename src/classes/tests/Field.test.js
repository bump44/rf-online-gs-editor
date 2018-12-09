import Field from '../Field';

describe('Classes', () => {
  describe('Field', () => {
    it('should throw invariant errors', () => {
      expect(() => new Field()).toThrow();
      expect(() => new Field({ type: Number, name: 's' })).toThrow();
      expect(
        () => new Field({ type: Number, name: 'valid', len: 'invalid' }),
      ).toThrow();

      expect(
        () =>
          new Field({ type: Number, name: 'valid', len: 32, as: 'invalid' }),
      ).toThrow();
    });
    it('should typeClassName defined', () => {
      expect(
        new Field({ type: Number, name: 'valid', len: 32 }).getTypeClassName(),
      ).toEqual('Number');

      expect(
        new Field({ type: Boolean, name: 'valid', len: 32 }).getTypeClassName(),
      ).toEqual('Boolean');

      expect(
        new Field({ type: String, name: 'valid', len: 32 }).getTypeClassName(),
      ).toEqual('String');
    });
    it('should typeClassName undefined', () => {
      const field = new Field({ type: String, name: 'valid', len: 32 });
      field.type = undefined;
      expect(field.getTypeClassName()).toBeUndefined();

      field.type = '__invalid_type__';
      expect(field.getTypeClassName()).toBeUndefined();

      field.type = { toString: () => '__invalid_type__' };
      expect(field.getTypeClassName()).toBeUndefined();
    });
    it('should return dynamic length', () => {
      const field = new Field({
        type: String,
        name: 'field',
        len: values => values.len,
      });

      expect(field.getLen({ len: 32 })).toEqual(32);
      expect(field.getLen({})).toEqual(undefined);
      expect(() => field.getLen()).toThrow();
      expect(new Field({ name: 'fl', type: Number, len: 32 }).getLen()).toEqual(
        32,
      );
    });
    it('should return Number|Boolean weights', () => {
      expect(
        new Field({ type: Number, len: () => 8, name: 'fl' }).getWeight({}),
      ).toEqual(1);

      expect(
        new Field({ type: Number, len: 8, name: 'fl' }).getWeight(),
      ).toEqual(1);

      expect(
        new Field({ type: Number, len: 16, name: 'fl' }).getWeight(),
      ).toEqual(2);

      expect(
        new Field({ type: Number, len: 32, name: 'fl' }).getWeight(),
      ).toEqual(4);

      expect(
        new Field({ type: Number, len: 64, name: 'fl' }).getWeight(),
      ).toEqual(8);

      expect(() =>
        new Field({ type: Number, len: 65, name: 'fl' }).getWeight(),
      ).toThrow();
    });
    it('should return String weights', () => {
      expect(
        new Field({ type: String, len: 8, name: 'fl', as: 'hex' }).getWeight(),
      ).toEqual(1);

      expect(
        new Field({ type: String, len: 16, name: 'fl', as: 'hex' }).getWeight(),
      ).toEqual(2);

      expect(
        new Field({ type: String, len: 32, name: 'fl', as: 'hex' }).getWeight(),
      ).toEqual(4);

      expect(() =>
        new Field({ type: String, len: 65, name: 'fl', as: 'hex' }).getWeight(),
      ).toThrow();

      expect(
        new Field({ type: String, len: 150, name: 'fl' }).getWeight(),
      ).toEqual(150);
    });
    it('should throw error on getWeight', () => {
      const field = new Field({ type: String, len: 32, name: 'fl', as: 'hex' });
      field.getType = () => '__unknown__';
      expect(() => field.getWeight()).toThrow();
    });
    it('should exist toObject', () => {
      expect(
        new Field({ type: Number, name: 'fl', len: 32 }).toObject(),
      ).toMatchSnapshot();
    });
    it('should exist toPlainObject', () => {
      expect(
        new Field({ type: Number, name: 'fl', len: 32 }).toPlainObject(),
      ).toMatchSnapshot();
      expect(
        new Field({ type: Number, name: 'fl', len: () => 32 }).toPlainObject(
          {},
        ),
      ).toBeDefined();
    });
    it('should exist toSchema', () => {
      expect(
        new Field({ type: Number, name: 'fl', len: 32 }).toSchema(),
      ).toMatchSnapshot();
    });
  });
});

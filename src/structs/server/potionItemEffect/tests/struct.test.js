import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('PotionItemEffect', () => {
      describe('Struct', () => {
        it('should exist', () => {
          expect(struct.toPlainObject()).toMatchSnapshot();
        });
      });
    });
  });
});

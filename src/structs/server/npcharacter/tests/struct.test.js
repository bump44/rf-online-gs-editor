import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('NPCharacter', () => {
      describe('Struct', () => {
        it('should exist', () => {
          expect(struct.toPlainObject()).toMatchSnapshot();
        });
      });
    });
  });
});

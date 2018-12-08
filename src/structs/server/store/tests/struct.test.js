import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('Store', () => {
      describe('Struct', () => {
        it('should exist', () => {
          expect(struct.toPlainObject()).toMatchSnapshot();
        });
      });
    });
  });
});

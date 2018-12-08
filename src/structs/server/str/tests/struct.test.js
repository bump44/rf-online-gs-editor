import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('Str', () => {
      describe('Struct', () => {
        it('should exist', () => {
          expect(struct.toPlainObject()).toMatchSnapshot();
        });
      });
    });
  });
});

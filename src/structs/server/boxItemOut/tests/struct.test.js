import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('BoxItemOut', () => {
      describe('Struct', () => {
        it('should exist', () => {
          expect(struct.toPlainObject()).toMatchSnapshot();
        });
      });
    });
  });
});

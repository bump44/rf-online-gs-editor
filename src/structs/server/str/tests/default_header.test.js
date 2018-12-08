import defaultHeader from '../default_header';

describe('Structs', () => {
  describe('Server', () => {
    describe('Str', () => {
      describe('DefaultHeader', () => {
        it('should exist', () => {
          expect(
            defaultHeader.map(fld => fld.toPlainObject()),
          ).toMatchSnapshot();
        });
      });
    });
  });
});

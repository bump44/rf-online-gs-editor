import defaultHeader from '../default_header';

describe('Structs', () => {
  describe('Server', () => {
    describe('BoxItemOut', () => {
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

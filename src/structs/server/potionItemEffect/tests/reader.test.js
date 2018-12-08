import Reader from '../reader';
import readerStruct from '../reader_struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('PotionItemEffect', () => {
      describe('Reader', () => {
        it('should exist', () => {
          expect(Reader).toBeInstanceOf(Function);
        });
        it('should construct', () => {
          const path = './some/path/to/file.dat';
          const reader = new Reader({ path });
          expect(reader.getName()).toEqual('ServerPotionItemEffectReader');
          expect(reader.getStruct()).toEqual(readerStruct);
          expect(reader.getPath()).toEqual(path);
        });
        it('should throw error because path is required', () => {
          expect(() => new Reader()).toThrow();
        });
      });
    });
  });
});

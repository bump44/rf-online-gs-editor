import readerStruct from '../reader_struct';
import defaultHeader from '../default_header';
import struct from '../struct';

describe('Structs', () => {
  describe('Server', () => {
    describe('PotionItemEffect', () => {
      describe('ReaderStruct', () => {
        it('should exist', () => {
          expect(readerStruct.length).toBe(1);
        });
        it('should have valid header & block', () => {
          expect(readerStruct[0].header).toEqual(defaultHeader);
          expect(readerStruct[0].block).toEqual(struct);
          expect(Object.keys(readerStruct[0])).toEqual(['header', 'block']);
        });
      });
    });
  });
});

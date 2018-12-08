import BufferGenerator from '../BufferGenerator';
import Field from '../Field';

function createBuffer(len = 0) {
  return Buffer.from(Array.from(Array(len)).map(() => 0));
}

describe('Classes', () => {
  describe('BufferGenerator', () => {
    it('should exist', () => {
      expect(new BufferGenerator()).toBeInstanceOf(BufferGenerator);
      expect(new BufferGenerator().getBuffer()).toEqual(Buffer.from([]));
    });
    it('should concat buffers', () => {
      const generator = new BufferGenerator();
      const buffer = Buffer.from('some string');
      const buffer1 = Buffer.from('some string1');
      const result = Buffer.concat([generator.getBuffer(), buffer, buffer1]);
      expect(new BufferGenerator().concat(buffer, buffer1).getBuffer()).toEqual(
        result,
      );
    });
    it('should create empty buffer', () => {
      expect(new BufferGenerator().createBuffer(12)).toEqual(createBuffer(12));
      expect(new BufferGenerator().createBuffer(50)).toEqual(createBuffer(50));
      expect(new BufferGenerator().createBuffer()).toEqual(createBuffer());
    });
    it('should add int8 to buffer', () => {
      const buffer = createBuffer(1);
      buffer.writeInt8(10, 0);
      expect(new BufferGenerator().addInt8(10).getBuffer()).toEqual(buffer);
    });
    it('should add int16LE to buffer', () => {
      const buffer = createBuffer(2);
      buffer.writeInt16LE(10, 0);
      expect(new BufferGenerator().addInt16LE(10).getBuffer()).toEqual(buffer);
    });
    it('should add int16BE to buffer', () => {
      const buffer = createBuffer(2);
      buffer.writeInt16BE(10, 0);
      expect(new BufferGenerator().addInt16BE(10).getBuffer()).toEqual(buffer);
    });
    it('should add int32LE to buffer', () => {
      const buffer = createBuffer(4);
      buffer.writeInt32LE(10, 0);
      expect(new BufferGenerator().addInt32LE(10).getBuffer()).toEqual(buffer);
    });
    it('should add int32BE to buffer', () => {
      const buffer = createBuffer(4);
      buffer.writeInt32BE(10, 0);
      expect(new BufferGenerator().addInt32BE(10).getBuffer()).toEqual(buffer);
    });
    it('should add floatLE to buffer', () => {
      const buffer = createBuffer(4);
      buffer.writeFloatLE(10.4, 0);
      expect(new BufferGenerator().addFloatLE(10.4).getBuffer()).toEqual(
        buffer,
      );
    });
    it('should add floatBE to buffer', () => {
      const buffer = createBuffer(4);
      buffer.writeFloatBE(10.4, 0);
      expect(new BufferGenerator().addFloatBE(10.4).getBuffer()).toEqual(
        buffer,
      );
    });
    it('should add string to buffer', () => {
      expect(
        new BufferGenerator()
          .addString('string')
          .getBuffer()
          .toString(),
      ).toEqual('string');

      expect(
        new BufferGenerator()
          .addString('___')
          .addString(undefined)
          .getBuffer()
          .toString(),
      ).toEqual('___');

      expect(
        new BufferGenerator()
          .addString('___')
          .addString('=')
          .addString(false)
          .addString(':')
          .getBuffer()
          .toString(),
      ).toEqual('___=:');

      expect(
        new BufferGenerator()
          .addString('string', { len: 3 })
          .getBuffer()
          .toString(),
      ).toEqual('str');

      expect(
        new BufferGenerator()
          .addString('string', { len: 5, iconv: 'win1251' })
          .getBuffer()
          .toString(),
      ).toEqual('strin');

      expect(() =>
        new BufferGenerator().addString('str', { iconv: 'undefined_encode' }),
      ).toThrowErrorMatchingSnapshot();
    });
    it('should add hex32 to buffer', () => {
      expect(
        new BufferGenerator()
          .addHex32('551311C8')
          .getBuffer()
          .toString('hex')
          .toUpperCase(),
      ).toEqual('551311C8');

      expect(
        new BufferGenerator()
          .addHex32()
          .getBuffer()
          .toString('hex')
          .toUpperCase(),
      ).toEqual('00000000');

      expect(
        new BufferGenerator()
          .addHex32(true)
          .getBuffer()
          .toString('hex')
          .toUpperCase(),
      ).toEqual('00000000');
    });
    it('should add by field Number:8', () => {
      const field = new Field({ type: Number, len: 8, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, 10)
          .getBuffer()
          .readInt8(),
      ).toEqual(10);
    });
    it('should add by field Number:16', () => {
      const field = new Field({ type: Number, len: 16, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, 10)
          .getBuffer()
          .readInt16LE(),
      ).toEqual(10);
    });
    it('should add by field Number:32', () => {
      const field = new Field({ type: Number, len: 32, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, 10)
          .getBuffer()
          .readInt32LE(),
      ).toEqual(10);
    });
    it('should add by field Number:32 float', () => {
      const field = new Field({
        type: Number,
        len: 32,
        name: 'field',
        as: 'float',
      });
      expect(
        new BufferGenerator()
          .addByField(field, 10.5)
          .getBuffer()
          .readFloatLE(),
      ).toEqual(10.5);
    });
    it('should add by field String', () => {
      const field = new Field({ type: String, len: 6, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, 'string')
          .getBuffer()
          .toString(),
      ).toEqual('string');
    });
    it('should add by field String:32 hex', () => {
      const field = new Field({
        type: String,
        len: 32,
        name: 'field',
        as: 'hex',
      });
      expect(
        new BufferGenerator()
          .addByField(field, '551311C8')
          .getBuffer()
          .toString('hex')
          .toUpperCase(),
      ).toEqual('551311C8');
    });
    it('should add by field Boolean:8', () => {
      const field = new Field({ type: Boolean, len: 8, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, true)
          .getBuffer()
          .readInt8(),
      ).toEqual(1);
      expect(
        new BufferGenerator()
          .addByField(field, false)
          .getBuffer()
          .readInt8(),
      ).toEqual(0);
    });
    it('should add by field Boolean:16', () => {
      const field = new Field({ type: Boolean, len: 16, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, true)
          .getBuffer()
          .readInt16LE(),
      ).toEqual(1);
      expect(
        new BufferGenerator()
          .addByField(field, false)
          .getBuffer()
          .readInt16LE(),
      ).toEqual(0);
    });
    it('should add by field Boolean:32', () => {
      const field = new Field({ type: Boolean, len: 32, name: 'field' });
      expect(
        new BufferGenerator()
          .addByField(field, true)
          .getBuffer()
          .readInt32LE(),
      ).toEqual(1);
      expect(
        new BufferGenerator()
          .addByField(field, false)
          .getBuffer()
          .readInt32LE(),
      ).toEqual(0);
    });
    it('should add by field throw error', () => {
      // unknown number length
      expect(() =>
        new BufferGenerator().addByField(
          new Field({ type: Number, len: 144, name: 'field' }),
          'value',
        ),
      ).toThrowErrorMatchingSnapshot();

      // unknown boolean length
      expect(() =>
        new BufferGenerator().addByField(
          new Field({ type: Boolean, len: 144, name: 'field' }),
          'value',
        ),
      ).toThrowErrorMatchingSnapshot();

      // unknown type
      expect(() =>
        new BufferGenerator().addByField(
          {
            getType() {
              return 'unknown';
            },
          },
          'value',
        ),
      ).toThrowErrorMatchingSnapshot();
    });
    it('should add by field & concat buffers', () => {
      expect(
        new BufferGenerator()
          .addByField(
            new Field({ type: String, len: 32, name: 'field1' }),
            'some string',
          )
          .addByField(
            new Field({ type: Number, len: 32, name: 'field2' }),
            1024,
          )
          .addByField(
            new Field({ type: Boolean, len: 32, name: 'field3' }),
            true,
          )
          .getBuffer(),
      ).toMatchSnapshot();
    });
  });
});

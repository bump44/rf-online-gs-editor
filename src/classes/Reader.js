/* eslint-disable no-plusplus, no-unneeded-ternary, default-case, no-fallthrough */
import fs from 'fs';
import iconv from 'iconv-lite';

export default class Reader {
  constructor({ path, completedBuffer, fileBuffer, needDecrypt }) {
    this.offset = 0;

    if (path) {
      this.path = path;
    }

    if (fileBuffer) {
      this.fileBuffer = fileBuffer;
    }

    if (completedBuffer) {
      this.completedBuffer = completedBuffer;
    }

    if (needDecrypt !== undefined) {
      this.needDecrypt = !!needDecrypt;
    }

    if (!path && !completedBuffer && !fileBuffer) {
      throw new Error(
        'Try provide `path` or `completedBuffer` or `fileBuffer` to Reader class!',
      );
    }
  }

  getOffset() {
    return this.offset;
  }

  getString(offset = 0, props = {}) {
    const { len } = props;
    const decode = props.iconv;
    const buffer = this.getCompletedBuffer();
    const arrayBytes = [];

    for (let i = offset; i < offset + len; i++) {
      arrayBytes.push(buffer[i]);
    }

    const bufferFromBytes = Buffer.from(arrayBytes);

    if (typeof decode === 'string' && decode) {
      return iconv.decode(bufferFromBytes, decode);
    }

    return bufferFromBytes;
  }

  getHex32(offset = 0, props = {}) {
    const toStringHex = props.toStringHex === false ? false : true;

    const buffer = this.getCompletedBuffer();

    const byte0 = buffer[offset + 0];
    const byte1 = buffer[offset + 1];
    const byte2 = buffer[offset + 2];
    const byte3 = buffer[offset + 3];

    const bufferFromBytes = Buffer.from([byte0, byte1, byte2, byte3]);

    if (toStringHex) {
      return bufferFromBytes.toString('hex');
    }

    return bufferFromBytes;
  }

  getBlock(offset = 0, blockSize = 0) {
    const buffer = this.getCompletedBuffer();
    const arrayBytes = [];

    for (let i = offset; i < offset + blockSize; i++) {
      arrayBytes.push(buffer[i]);
    }

    return new Reader({
      completedBuffer: Buffer.from(arrayBytes),
    });
  }

  getInt8(offset = 0, props = {}) {
    const buffer = this.getCompletedBuffer();
    return buffer.readInt8(offset, !!props.noAssert);
  }

  getInt16LE(offset = 0, props = {}) {
    const buffer = this.getCompletedBuffer();
    return buffer.readInt16LE(offset, !!props.noAssert);
  }

  getInt32LE(offset = 0, props = {}) {
    const buffer = this.getCompletedBuffer();
    return buffer.readInt32LE(offset, !!props.noAssert);
  }

  getFloatLE(offset = 0, props = {}) {
    const buffer = this.getCompletedBuffer();
    return buffer.readFloatLE(offset, !!props.noAssert);
  }

  getDobuleLE(offset = 0, props = {}) {
    const buffer = this.getCompletedBuffer();
    return buffer.readDoubleLE(offset, !!props.noAssert);
  }

  getByField(field, stepProps = {}) {
    const props = { ...stepProps };
    const offset = props.offset === undefined ? this.offset : props.offset;
    const increaseOffsetAndReturnValue = (offsetValue, returnValue) => {
      this.offset += offsetValue;
      return returnValue;
    };

    switch (field.getType()) {
      case Number:
        switch (field.getLen()) {
          case 8:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.getInt8(offset, props.readProps),
            );
          case 16:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.getInt16LE(offset, props.readProps),
            );
          case 32:
            switch (field.getAs()) {
              case 'float':
                return increaseOffsetAndReturnValue(
                  field.getWeight(),
                  this.getFloatLE(offset, props.readProps),
                );
              default:
                return increaseOffsetAndReturnValue(
                  field.getWeight(),
                  this.getInt32LE(offset, props.readProps),
                );
            }
          case 64: // double only
            switch (field.getAs()) {
              case 'double':
                return increaseOffsetAndReturnValue(
                  field.getWeight(),
                  this.getDobuleLE(offset, props.readProps),
                );
            }
        }
      case String:
        switch (field.getLen()) {
          case 32:
            if (field.getAs() === 'hex') {
              return increaseOffsetAndReturnValue(
                field.getWeight(),
                this.getHex32(offset, props.readProps),
              );
            }
          default:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.getString(offset, {
                iconv: 'win1251',
                ...props.readProps,
                len: field.getLen(),
              }),
            );
        }
      case Boolean:
        switch (field.getLen()) {
          case 8:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              !!this.getInt8(offset, props.readProps),
            );
          case 16:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              !!this.getInt16LE(offset, props.readProps),
            );
          case 32:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              !!this.getInt32LE(offset, props.readProps),
            );
        }
    }

    console.error(
      'Undefined field type!',
      'Field:',
      field,
      'StepProps:',
      stepProps,
      'GenProps:',
      props,
    );
    throw new Error(
      `Undefined field type ${typeof field.getType()}: ${field.getLen()}`,
    );
  }

  increaseOffset(value = 0) {
    this.offset += value;
    return this;
  }

  cleanOffset() {
    this.offset = 0;
    return this;
  }

  getFileBuffer() {
    if (this.fileBuffer) {
      return this.fileBuffer;
    }

    throw new Error('File buffer not loaded.');
  }

  getCompletedBuffer() {
    if (this.completedBuffer) {
      return this.completedBuffer;
    }

    throw new Error('Completed buffer not loaded.');
  }

  loadFileBuffer() {
    if (this.fileBuffer) {
      return Promise.resolve(this.fileBuffer);
    }

    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (err, buffer) => {
        if (err) {
          return reject(err);
        }

        this.fileBuffer = buffer;
        return resolve(this.fileBuffer);
      });
    });
  }

  loadCompletedBuffer() {
    if (this.completedBuffer) {
      return Promise.resolve(this.completedBuffer);
    }

    if (/^.+\.edf$/i.test(this.path) || this.needDecrypt) {
      console.error('decrypt need');
      // TODO: decrypt & return
    }

    return this.loadFileBuffer().then(buffer => {
      this.completedBuffer = buffer;
      return this.completedBuffer;
    });
  }

  asyncLoadSubclasses() {
    return Promise.all([this.loadCompletedBuffer()]);
  }
}

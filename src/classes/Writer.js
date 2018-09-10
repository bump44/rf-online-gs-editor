/*
  eslint-disable no-plusplus,
  no-unneeded-ternary,
  default-case,
  no-fallthrough,
  no-underscore-dangle
*/
import iconv from 'iconv-lite';
import path from 'path';
import { parseInt } from 'lodash';
import { writeFile } from '../utils/fs';
import { enCryptByBuf } from '../utils/edf';

export default class Writer {
  constructor({
    outputPath,
    dirname,
    encryptDirname,
    ext,
    encryptExt,
    buffer,
    fileName,
  }) {
    this.fileName = fileName;
    this.outputPath = outputPath;
    this.dirname = dirname;
    this.encryptDirname = encryptDirname;
    this.ext = ext;
    this.encryptExt = encryptExt;
    this.buffer = buffer ? buffer : Buffer.from([]);
    this.offset = 0;
    this.isNeedEncrypt = this.encryptDirname && this.encryptExt;
  }

  toFile() {
    const defPath = path.resolve(this.outputPath, this.dirname);
    const encPath = this.isNeedEncrypt
      ? path.resolve(this.outputPath, this.encryptDirname)
      : null;
    const defFileName = [this.fileName, '.', this.ext].join('');
    const encFileName = this.isNeedEncrypt
      ? [this.fileName, '.', this.encryptExt].join('')
      : null;

    return writeFile(path.resolve(defPath, defFileName), this.buffer).then(
      () => {
        if (!this.isNeedEncrypt) {
          return true;
        }

        return enCryptByBuf(this.buffer)
          .then(edfBuf => writeFile(path.resolve(encPath, encFileName), edfBuf))
          .then(() => true);
      },
    );
  }

  getBuffer() {
    return this.buffer;
  }

  setBuffer(buf) {
    this.buffer = buf;
    return this;
  }

  resetBuffer() {
    this.buffer = Buffer.from([]);
    this.offset = 0;
    return this;
  }

  concat(...buffers) {
    this.buffer = Buffer.concat([this.buffer, ...buffers]);
    return this;
  }

  setInt8(offset = 0, value) {
    this.buffer.writeInt8(parseInt(value), offset);
    return this;
  }

  setInt16LE(offset = 0, value) {
    this.buffer.writeInt16LE(parseInt(value), offset);
    return this;
  }

  setInt32LE(offset = 0, value) {
    this.buffer.writeInt32LE(parseInt(value), offset);
    return this;
  }

  setFloatLE(offset = 0, value) {
    this.buffer.writeFloatLE(parseFloat(value), offset);
    return this;
  }

  setString(offset = 0, payloadString, props = {}) {
    const value = typeof payloadString === 'string' ? payloadString : '';
    const { len } = props;
    const encode = props.iconv;
    const stringBuffer =
      typeof encode === 'string' && encode
        ? iconv.encode(value.substring(0, len), encode)
        : Buffer.from(value);

    for (let i = 0; i < stringBuffer.length; i++) {
      this.buffer[i + offset] = stringBuffer[i];
    }

    return this;
  }

  setHex32(offset = 0, payloadString) {
    const value =
      typeof payloadString === 'string' ? payloadString.substring(0, 8) : '';
    const hexBuffer = Buffer.from(value, 'hex');
    for (let i = 0; i < hexBuffer.length; i++) {
      this.buffer[i + offset] = hexBuffer[i];
    }
    return this;
  }

  setByField(field, value, stepProps = {}) {
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
              this.setInt8(offset, value, props.writeProps),
            );
          case 16:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.setInt16LE(offset, value, props.writeProps),
            );
          case 32:
            switch (field.getAs()) {
              case 'float':
                return increaseOffsetAndReturnValue(
                  field.getWeight(),
                  this.setFloatLE(offset, value, props.writeProps),
                );
              default:
                return increaseOffsetAndReturnValue(
                  field.getWeight(),
                  this.setInt32LE(offset, value, props.writeProps),
                );
            }
        }
      case String:
        switch (field.getLen()) {
          case 32:
            if (field.getAs() === 'hex') {
              return increaseOffsetAndReturnValue(
                field.getWeight(),
                this.setHex32(offset, value, props.writeProps),
              );
            }
          default:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.setString(offset, value, {
                iconv: 'win1251',
                ...props.writeProps,
                len: field.getLen(),
              }),
            );
        }
      case Boolean:
        switch (field.getLen()) {
          case 8:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.setInt8(offset, value ? 1 : 0, props.writeProps),
            );
          case 16:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.setInt16LE(offset, value ? 1 : 0, props.writeProps),
            );
          case 32:
            return increaseOffsetAndReturnValue(
              field.getWeight(),
              this.setInt32LE(offset, value ? 1 : 0, props.writeProps),
            );
        }
    }

    console.error( // eslint-disable-line
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
}

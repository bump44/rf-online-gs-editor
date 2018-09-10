import Promise from 'bluebird';
import { forEach, map } from 'lodash';
import Reader from './Reader';

export default class FileReader {
  constructor({ name, path }) {
    this.name = name;
    this.path = path;
    this.reader = new Reader({ path });

    this.cache = {
      headers: undefined,
      blocks: undefined,
    };
  }

  // mandatory call before start
  asyncLoadSubclasses() {
    return Promise.all([this.reader.asyncLoadSubclasses()]);
  }

  getBuffer() {
    return this.reader.getCompletedBuffer();
  }

  getBlocks() {
    if (this.cache.blocks !== undefined) {
      return this.cache.blocks;
    }

    const headers = this.getHeaders();
    const results = [];

    // clean offset step
    this.reader.cleanOffset();

    forEach(this.struct, (struct, index) => {
      const typeHeader = headers[index];

      if (typeHeader === undefined) {
        throw new Error(`Header for object type ${struct.type} not parsed!`);
      }

      if (typeHeader.type !== struct.type) {
        throw new Error(
          `Impossible error! Types not compared header(${
            typeHeader.type
          }) != struct(${struct.type}).`,
        );
      }

      const { header } = typeHeader;

      // header weights
      const headerWeight = struct.header.reduce(
        (accumulator, field) => accumulator + field.getWeight(),
        0,
      );

      if (header.nCount > 120000) {
        throw new Error(`Header count value: ${header.nCount}`);
      }

      const getBlocks = () => {
        if (struct.skipBlocks) {
          return [];
        }

        return map(Array.from(Array(header.nCount)), (empty, arrayIndex) => {
          const baseOffset = header.nOffset + headerWeight;
          const blockOffset = arrayIndex * header.nBlockSize;
          const blockReader = this.reader.getBlock(
            baseOffset + blockOffset,
            header.nBlockSize,
          );
          const values = {};

          blockReader.cleanOffset();
          forEach(struct.block.getFields(), field => {
            values[field.getName()] = blockReader.getByField(field);
          });

          values.arrayIndex = arrayIndex;
          return values;
        });
      };

      const blocks = getBlocks();

      results.push({
        type: struct.type,
        blocks,
        skipBlocks: struct.skipBlocks,
        header,
      });
    });

    return results;
  }

  getHeaders() {
    if (this.cache.headers !== undefined) {
      return this.cache.headers;
    }

    const results = [];

    // clean offset step
    this.reader.cleanOffset();

    let autoNOffset = 0;

    forEach(this.struct, struct => {
      const header = {};

      let headerSize = 0;

      forEach(struct.header, field => {
        header[field.getName()] = this.reader.getByField(field);
        headerSize += field.getWeight();
      });

      if (struct.headerForceValues) {
        forEach(struct.headerForceValues, (propValue, propName) => {
          header[propName] =
            typeof propValue === 'function' ? propValue(header) : propValue;
        });
      }

      if (header.nTotalSize === undefined) {
        header.nTotalSize = header.nCount * header.nBlockSize;
      }

      if (header.nOffset === undefined) {
        header.nOffset = autoNOffset; // auto-calc offset
      }

      autoNOffset += header.nTotalSize + headerSize;

      // header weights
      // const headerWeight = struct.header.reduce((accumulator, field) => {
      //   return accumulator + field.getWeight();
      // }, 0);

      // this.reader.increaseOffset(headerWeight);
      // this.reader.increaseOffset(header.nTotalSize);
      this.reader.increaseOffset(header.nCount * header.nBlockSize);

      results.push({
        type: struct.type,
        header,
      });
    });

    this.cache.headers = results;
    return this.cache.headers;
  }

  getHeader() {
    const [header] = this.getHeaders();
    return header;
  }
}

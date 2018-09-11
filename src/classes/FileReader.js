import Promise from 'bluebird';
import { forEach, map } from 'lodash';
import Reader from './Reader';
import { COUNT, OFFSET, BLOCK_SIZE, TOTAL_SIZE } from './constants';

export default class FileReader {
  constructor({ name, path, struct = [] }) {
    this.name = name;
    this.path = path;
    this.reader = new Reader({ path });
    this.struct = struct;

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

      if (header[COUNT] > 120000) {
        throw new Error(`Header count value: ${header[COUNT]}`);
      }

      const getBlocks = () => {
        if (struct.skipBlocks) {
          return [];
        }

        return map(Array.from(Array(header[COUNT])), (empty, arrayIndex) => {
          const baseOffset = header[OFFSET] + headerWeight;
          const blockOffset = arrayIndex * header[BLOCK_SIZE];
          const blockReader = this.reader.getBlock(
            baseOffset + blockOffset,
            header[BLOCK_SIZE],
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

      if (header[TOTAL_SIZE] === undefined) {
        header[TOTAL_SIZE] = header[COUNT] * header[BLOCK_SIZE];
      }

      if (header[OFFSET] === undefined) {
        header[OFFSET] = autoNOffset; // auto-calc offset
      }

      autoNOffset += header[TOTAL_SIZE] + headerSize;

      // header weights
      // const headerWeight = struct.header.reduce((accumulator, field) => {
      //   return accumulator + field.getWeight();
      // }, 0);

      // this.reader.increaseOffset(headerWeight);
      // this.reader.increaseOffset(header[TOTAL_SIZE]);
      this.reader.increaseOffset(header[COUNT] * header[BLOCK_SIZE]);

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

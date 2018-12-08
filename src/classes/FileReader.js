import { forEach, map } from 'lodash';
import Promise from 'bluebird';
import Reader from '~/classes/Reader';

import {
  COUNT,
  OFFSET,
  BLOCK_SIZE,
  TOTAL_SIZE,
  COUNT_COLUMNS,
} from './constants';

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

    let globDynamic = false;
    let dynamicOffset = 0;
    let lastStaticOffset = 0;

    forEach(this.struct, (struct, index) => {
      const typeHeader = headers[index];
      const isDynamic = struct.block.isDynamic();
      if (isDynamic) {
        globDynamic = true;
      }

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

      if (!globDynamic) {
        lastStaticOffset = header[OFFSET] + header[TOTAL_SIZE] + headerWeight;
      }

      if (header[COUNT] > 120000 || header[COUNT] < 0) {
        throw new Error(`Header count value: ${header[COUNT]}`);
      }

      if (!globDynamic && struct.block.getWeight() !== header[BLOCK_SIZE]) {
        // eslint-disable-next-line
        console.warn(
          `The structure '${struct.type}' probably contains an error!`,
          'Header block size not equal fields weight.',
          {
            blockSize: header[BLOCK_SIZE],
            fieldsWeight: struct.block.getWeight(),
          },
        );
      }

      const getBlocks = () => {
        if (struct.skipBlocks) {
          return [];
        }

        const staticReader = (_, arrayIndex) => {
          const baseOffset = header[OFFSET] + headerWeight;
          const blockOffset = arrayIndex * header[BLOCK_SIZE];

          let blockReader;

          try {
            blockReader = this.reader.getBlock(
              baseOffset + blockOffset,
              header[BLOCK_SIZE],
            );
          } catch (err) {
            throw new Error(
              `Could not read block ${
                struct.type
              }, offset: ${blockOffset}, message: ${err.message}`,
            );
          }

          const values = {};
          blockReader.cleanOffset();

          forEach(struct.block.getFields(), field => {
            try {
              values[field.getName()] = blockReader.getByField(
                field,
                undefined,
                values,
              );
            } catch (err) {
              throw new Error(
                `Could not read block value ${
                  struct.type
                }, fieldName: ${field.getName()}, message: ${err.message}`,
              );
            }
          });

          values.arrayIndex = arrayIndex;
          return values;
        };

        const dynamicReader = (_, arrayIndex) => {
          const values = {};
          forEach(struct.block.getFields(), field => {
            values[field.getName()] = this.reader.getByField(
              field,
              {
                offset: lastStaticOffset + dynamicOffset,
              },
              values,
            );

            dynamicOffset += field.getWeight(values);
          });

          return { ...values, arrayIndex };
        };

        if (globDynamic) {
          let count = 0;
          forEach(struct.header, field => {
            const value = this.reader.getByField(field, {
              offset: lastStaticOffset + dynamicOffset,
            });

            if (field.getName() === COUNT) {
              count = value;
            }

            dynamicOffset += field.getWeight();
          });

          return map(Array.from(Array(count)), dynamicReader);
        }

        return map(Array.from(Array(header[COUNT])), staticReader);
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

    let globDynamic = false;
    let autoNOffset = 0;

    forEach(this.struct, struct => {
      if (globDynamic || struct.block.isDynamic()) {
        globDynamic = true;

        // we cannot count because some of the values are formed sequentially
        results.push({
          type: struct.type,
          header: {
            [COUNT]: 0,
            [OFFSET]: 0,
            [BLOCK_SIZE]: 0,
            [TOTAL_SIZE]: 0,
            [COUNT_COLUMNS]: 0,
          },
        });

        return;
      }

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

      if (header[BLOCK_SIZE] === undefined) {
        header[BLOCK_SIZE] = struct.block.getWeight();
      }

      if (
        header[TOTAL_SIZE] === undefined &&
        header[COUNT] !== undefined &&
        header[BLOCK_SIZE] !== undefined
      ) {
        header[TOTAL_SIZE] = header[COUNT] * header[BLOCK_SIZE];
      }

      if (header[OFFSET] === undefined) {
        header[OFFSET] = autoNOffset; // auto-calc offset
      }

      autoNOffset +=
        (header[TOTAL_SIZE] !== undefined ? header[TOTAL_SIZE] : 0) +
        headerSize;

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

  getName() {
    return this.name;
  }

  getStruct() {
    return this.struct;
  }

  getPath() {
    return this.path;
  }
}

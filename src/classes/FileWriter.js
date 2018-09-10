// import Promise from 'bluebird';
import { List } from 'immutable';
import Writer from './Writer';

export default class FileWriter {
  constructor({
    name,
    outputPath,
    dirname,
    encryptDirname,
    payload,
    selectElement,
    struct,
    fileName,
    ext,
    encryptExt,
  }) {
    this.name = name;
    this.struct = struct;
    this.writer = new Writer({
      outputPath,
      dirname,
      encryptDirname,
      ext,
      encryptExt,
      fileName,
    });
    this.payload = payload;
    this.selectElement = selectElement;
  }

  setSelectElement(fn) {
    this.selectElement = fn;
    return this;
  }

  setPayload(payload = []) {
    this.payload = payload;
    return this;
  }

  getStruct() {
    return this.struct;
  }

  toFile() {
    return this.writer.toFile();
  }

  generateBuffer() {
    let nOrder = 0;
    let nOffset = 0;
    let totalSize = 0;
    const dataStruct = [];

    this.writer.resetBuffer();

    this.struct.forEach((struct, index) => {
      nOrder += 1;
      const headerWeight = struct.header.reduce(
        (acc, value) => acc + value.getWeight(),
        0,
      );
      const footerWeight = struct.footer.reduce(
        (acc, value) => acc + value.getWeight(),
        0,
      );
      const blockWeight = struct.block.getWeight();

      const blocks = this.payload[index];

      const nCount = blocks instanceof List ? blocks.count() : 0;
      const nBlockSize = blockWeight;
      const nTotalSize = nCount * nBlockSize;

      const headers = {
        nCount,
        nBlockSize,
        nTotalSize: nTotalSize + 8,
        nOrder,
        nOffset,
      };

      const footers = {};

      // increase offset to the next iteration header + totalSize + footerWeight
      nOffset += nTotalSize + headerWeight + footerWeight;
      totalSize = nOffset + nTotalSize + headerWeight + footerWeight; // dataStruct size

      dataStruct.push({
        struct,
        index,
        headerWeight,
        footerWeight,
        blockWeight,
        blocksWeight: nTotalSize,
        blocks,
        headers,
        footers,
        nOffset,
        totalSize,
      });
    });

    dataStruct.forEach(data => {
      const writer = new Writer({
        buffer: Buffer.from(
          Array.from(
            Array(
              // eslint-disable-line
              data.headerWeight + data.footerWeight + data.blocksWeight,
            ),
          ),
        ), // eslint-disable-line
      });

      data.struct.header.forEach(headerField => {
        writer.setByField(headerField, data.headers[headerField.getName()]);
      });

      if (data.blocks) {
        data.blocks.forEach(reduxIndex => {
          const element = this.selectElement(reduxIndex);
          data.struct.block.getFields().forEach(blockField => {
            const value = element.get(
              blockField.getWriterProp('take', blockField.getName()),
            );
            writer.setByField(blockField, value);
          });
        });
      }

      data.struct.footer.forEach(footerField => {
        writer.setByField(footerField, data.footers[footerField.getName()]);
      });

      this.writer.concat(writer.getBuffer());
    });

    return this.writer.getBuffer();
  }
}

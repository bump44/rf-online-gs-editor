import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ClientItemNDReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ClientItemNDReader',
      struct: readerStruct,
    });
  }
}

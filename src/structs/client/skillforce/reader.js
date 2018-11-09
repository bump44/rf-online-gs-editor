import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ClientStoreReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ClientStoreReader',
      struct: readerStruct,
    });
  }
}

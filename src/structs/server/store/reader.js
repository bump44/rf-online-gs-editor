import FileReader from '../../../classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerStoreReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerStoreReader',
      struct: readerStruct,
    });
  }
}

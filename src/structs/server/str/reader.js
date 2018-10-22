import FileReader from '../../../classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerStrReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerStrReader',
      struct: readerStruct,
    });
  }
}

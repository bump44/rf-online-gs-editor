import FileReader from '../../../classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerItemstrReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemstrReader',
      struct: readerStruct,
    });
  }
}

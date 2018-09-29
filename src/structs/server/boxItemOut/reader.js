import FileReader from '../../../classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerBoxItemOutReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerBoxItemOutReader',
      struct: readerStruct,
    });
  }
}

import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerNpcharacterReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerNpcharacterReader',
      struct: readerStruct,
    });
  }
}

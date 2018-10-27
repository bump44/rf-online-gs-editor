import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ClientResourceReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ClientResourceReader',
      struct: readerStruct,
    });
  }
}

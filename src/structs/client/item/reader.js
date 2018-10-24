import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ClientItemReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ClientItemReader',
      struct: readerStruct,
    });
  }
}

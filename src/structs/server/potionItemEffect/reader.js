import FileReader from '~/classes/FileReader';
import readerStruct from './reader_struct';

export default class ServerPotionItemEffectReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerPotionItemEffectReader',
      struct: readerStruct,
    });
  }
}

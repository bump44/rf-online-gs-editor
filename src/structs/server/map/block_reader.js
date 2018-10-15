import FileReader from '../../../classes/FileReader';
import defaultHeader from './default_header';
import blockStruct from './block_struct';

export default class ServerMapblockReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerMapblockReader',
      struct,
    });
  }
}

export const struct = [
  {
    header: defaultHeader,
    block: blockStruct,
  },
];

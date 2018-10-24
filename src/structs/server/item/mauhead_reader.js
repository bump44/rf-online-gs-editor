import FileReader from '~/classes/FileReader';
import { MAUHEAD } from '~/structs/item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMauheadReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMauheadReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUHEAD,
    header: defaultHeader,
    block: maupartStruct,
  },
];

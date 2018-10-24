import FileReader from '~/classes/FileReader';
import { MAUARM } from '~/structs/item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMauarmReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMauarmReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUARM,
    header: defaultHeader,
    block: maupartStruct,
  },
];

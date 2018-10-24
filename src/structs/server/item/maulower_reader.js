import FileReader from '~/classes/FileReader';
import { MAULOWER } from '~/structs/item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMaulowerReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMaulowerReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAULOWER,
    header: defaultHeader,
    block: maupartStruct,
  },
];

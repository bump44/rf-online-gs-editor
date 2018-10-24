import FileReader from '~/classes/FileReader';
import { MAKETOOL } from '~/structs/item_types';
import defaultHeader from './default_header';
import maketoolStruct from './maketool_struct';

export default class ServerItemMaketoolReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMaketoolReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAKETOOL,
    header: defaultHeader,
    block: maketoolStruct,
  },
];

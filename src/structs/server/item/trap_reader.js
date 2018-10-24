import FileReader from '~/classes/FileReader';
import { TRAP } from '~/structs/item_types';
import defaultHeader from './default_header';
import trapStruct from './trap_struct';

export default class ServerItemTrapReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemTrapReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: TRAP,
    header: defaultHeader,
    block: trapStruct,
  },
];

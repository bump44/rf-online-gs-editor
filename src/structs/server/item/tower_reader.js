import FileReader from '~/classes/FileReader';
import { TOWER } from '~/structs/item_types';
import defaultHeader from './default_header';
import towerStruct from './tower_struct';

export default class ServerItemTowerReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemTowerReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: TOWER,
    header: defaultHeader,
    block: towerStruct,
  },
];

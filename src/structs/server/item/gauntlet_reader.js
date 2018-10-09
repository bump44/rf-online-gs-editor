import FileReader from '../../../classes/FileReader';
import { GAUNTLET } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemGauntletReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemGauntletReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: GAUNTLET,
    header: defaultHeader,
    block: armorStruct,
  },
];

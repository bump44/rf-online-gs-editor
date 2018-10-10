import FileReader from '../../../classes/FileReader';
import { LOWER } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemLowerReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemLowerReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: LOWER,
    header: defaultHeader,
    block: armorStruct,
  },
];

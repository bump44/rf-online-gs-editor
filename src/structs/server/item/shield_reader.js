import FileReader from '../../../classes/FileReader';
import { SHIELD } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemShieldReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemShieldReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: SHIELD,
    header: defaultHeader,
    block: armorStruct,
  },
];

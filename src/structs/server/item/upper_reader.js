import FileReader from '../../../classes/FileReader';
import { UPPER } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemUpperReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemUpperReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: UPPER,
    header: defaultHeader,
    block: armorStruct,
  },
];

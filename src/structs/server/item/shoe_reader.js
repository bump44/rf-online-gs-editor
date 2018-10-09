import FileReader from '../../../classes/FileReader';
import { SHOE } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemShoeReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemShoeReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: SHOE,
    header: defaultHeader,
    block: armorStruct,
  },
];

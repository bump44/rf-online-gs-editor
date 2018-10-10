import FileReader from '../../../classes/FileReader';
import { AMULET } from '../../item_types';
import defaultHeader from './default_header';
import jewelryStruct from './jewelry_struct';

export default class ServerItemAmuletReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemAmuletReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: AMULET,
    header: defaultHeader,
    block: jewelryStruct,
  },
];

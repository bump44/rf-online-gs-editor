import FileReader from '../../../classes/FileReader';
import { MAUBACK } from '../../item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMaubackReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMaubackReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUBACK,
    header: defaultHeader,
    block: maupartStruct,
  },
];

import FileReader from '../../../classes/FileReader';
import { MAUUPPER } from '../../item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMauupperReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMauupperReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUUPPER,
    header: defaultHeader,
    block: maupartStruct,
  },
];

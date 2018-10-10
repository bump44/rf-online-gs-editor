import FileReader from '../../../classes/FileReader';
import { RING } from '../../item_types';
import defaultHeader from './default_header';
import jewelryStruct from './jewelry_struct';

export default class ServerItemRingReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemRingReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: RING,
    header: defaultHeader,
    block: jewelryStruct,
  },
];

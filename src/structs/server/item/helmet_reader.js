import FileReader from '../../../classes/FileReader';
import { HELMET } from '../../item_types';
import defaultHeader from './default_header';
import armorStruct from './armor_struct';

export default class ServerItemHelmetReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemHelmetReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: HELMET,
    header: defaultHeader,
    block: armorStruct,
  },
];

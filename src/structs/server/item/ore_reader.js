import FileReader from '../../../classes/FileReader';
import { ORE } from '../../item_types';
import defaultHeader from './default_header';
import oreStruct from './ore_struct';

export default class ServerItemOreReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemOreReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: ORE,
    header: defaultHeader,
    block: oreStruct,
  },
];

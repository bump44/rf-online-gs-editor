import FileReader from '~/classes/FileReader';
import { CASHMINING } from '~/structs/item_types';
import defaultHeader from './default_header';
import cashminingStruct from './cashmining_struct';

export default class ServerItemCashminingReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemCashminingReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: CASHMINING,
    header: defaultHeader,
    block: cashminingStruct,
  },
];

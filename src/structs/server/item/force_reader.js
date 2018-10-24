import FileReader from '~/classes/FileReader';
import { FORCE } from '~/structs/item_types';
import defaultHeader from './default_header';
import forceStruct from './force_struct';

export default class ServerItemForceReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemForceReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: FORCE,
    header: defaultHeader,
    block: forceStruct,
  },
];

import FileReader from '~/classes/FileReader';
import { FIRECRACKER } from '~/structs/item_types';
import defaultHeader from './default_header';
import firecrackerStruct from './firecracker_struct';

export default class ServerItemFirecrackerReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemFirecrackerReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: FIRECRACKER,
    header: defaultHeader,
    block: firecrackerStruct,
  },
];

import FileReader from '~/classes/FileReader';
import { CLOAK } from '~/structs/item_types';
import defaultHeader from './default_header';
import cloakStruct from './cloak_struct';

export default class ServerItemCloakReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemCloakReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: CLOAK,
    header: defaultHeader,
    block: cloakStruct,
  },
];

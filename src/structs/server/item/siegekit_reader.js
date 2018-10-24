import FileReader from '~/classes/FileReader';
import { SIEGEKIT } from '~/structs/item_types';
import defaultHeader from './default_header';
import siegekitStruct from './siegekit_struct';

export default class ServerItemSiegekitReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemSiegekitReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: SIEGEKIT,
    header: defaultHeader,
    block: siegekitStruct,
  },
];

import FileReader from '~/classes/FileReader';
import { BOOTY } from '~/structs/item_types';
import defaultHeader from './default_header';
import bootyStruct from './booty_struct';

export default class ServerItemBootyReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemBootyReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: BOOTY,
    header: defaultHeader,
    block: bootyStruct,
  },
];

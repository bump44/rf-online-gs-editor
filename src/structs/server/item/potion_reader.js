import FileReader from '~/classes/FileReader';
import { POTION } from '~/structs/item_types';
import defaultHeader from './default_header';
import potionStruct from './potion_struct';

export default class ServerItemPotionReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemPotionReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: POTION,
    header: defaultHeader,
    block: potionStruct,
  },
];

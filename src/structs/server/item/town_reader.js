import FileReader from '~/classes/FileReader';
import { TOWN } from '~/structs/item_types';
import defaultHeader from './default_header';
import townStruct from './town_struct';

export default class ServerItemTownReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemTownReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: TOWN,
    header: defaultHeader,
    block: townStruct,
  },
];

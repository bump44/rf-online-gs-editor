import FileReader from '~/classes/FileReader';
import { BOX } from '~/structs/item_types';
import defaultHeader from './default_header';
import boxStruct from './box_struct';

export default class ServerItemBoxReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemBoxReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: BOX,
    header: defaultHeader,
    block: boxStruct,
  },
];

import FileReader from '~/classes/FileReader';
import { ANIMUS } from '~/structs/item_types';
import animusStruct from './animus_struct';
import defaultHeader from './default_header';

export default class ServerItemAnimusReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemAnimusReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: ANIMUS,
    header: defaultHeader,
    block: animusStruct,
  },
];

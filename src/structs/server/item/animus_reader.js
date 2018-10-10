import FileReader from '../../../classes/FileReader';
import { ANIMUS } from '../../item_types';
import defaultHeader from './default_header';
import animusStruct from './animus_struct';

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

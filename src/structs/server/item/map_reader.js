import FileReader from '../../../classes/FileReader';
import { MAP } from '../../item_types';
import defaultHeader from './default_header';
import mapStruct from './map_struct';

export default class ServerItemMapReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMapReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAP,
    header: defaultHeader,
    block: mapStruct,
  },
];

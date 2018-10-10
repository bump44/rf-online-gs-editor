import FileReader from '../../../classes/FileReader';
import { MAKETOOL } from '../../item_types';
import defaultHeader from './default_header';
import maketoolStruct from './maketool_struct';

export default class ServerItemMakeToolReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMakeToolReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAKETOOL,
    header: defaultHeader,
    block: maketoolStruct,
  },
];

import FileReader from '../../../classes/FileReader';
import { UNITKEY } from '../../item_types';
import defaultHeader from './default_header';
import unitkeyStruct from './unitkey_struct';

export default class ServerItemUnitkeyReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemUnitkeyReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: UNITKEY,
    header: defaultHeader,
    block: unitkeyStruct,
  },
];

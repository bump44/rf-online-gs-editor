import FileReader from '../../../classes/FileReader';
import { DUNGEONKEY } from '../../item_types';
import defaultHeader from './default_header';
import dungeonkeyStruct from './dungeonkey_struct';

export default class ServerItemDungeonkeyReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemDungeonkeyReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: DUNGEONKEY,
    header: defaultHeader,
    block: dungeonkeyStruct,
  },
];

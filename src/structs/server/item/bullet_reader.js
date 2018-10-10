import FileReader from '../../../classes/FileReader';
import { BULLET } from '../../item_types';
import defaultHeader from './default_header';
import bulletStruct from './bullet_struct';

export default class ServerItemBulletReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemBulletReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: BULLET,
    header: defaultHeader,
    block: bulletStruct,
  },
];

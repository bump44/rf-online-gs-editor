import FileReader from '../../../classes/FileReader';
import { MAUBULLET } from '../../item_types';
import defaultHeader from './default_header';
import maubulletStruct from './maubullet_struct';

export default class ServerItemMaubulletReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMaubulletReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUBULLET,
    header: defaultHeader,
    block: maubulletStruct,
  },
];

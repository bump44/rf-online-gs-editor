import FileReader from '~/classes/FileReader';
import { WEAPON } from '~/structs/item_types';
import defaultHeader from './default_header';
import weaponStruct from './weapon_struct';

export default class ServerItemWeaponReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemWeaponReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: WEAPON,
    header: defaultHeader,
    block: weaponStruct,
  },
];

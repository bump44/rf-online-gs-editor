import FileReader from '~/classes/FileReader';
import { RECOVERY } from '~/structs/item_types';
import defaultHeader from './default_header';
import recoveryStruct from './recovery_struct';

export default class ServerItemRecoveryReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemRecoveryReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: RECOVERY,
    header: defaultHeader,
    block: recoveryStruct,
  },
];

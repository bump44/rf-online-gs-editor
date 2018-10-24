import FileReader from '~/classes/FileReader';
import { BATTERY } from '~/structs/item_types';
import defaultHeader from './default_header';
import batteryStruct from './battery_struct';

export default class ServerItemBatteryReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemBatteryReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: BATTERY,
    header: defaultHeader,
    block: batteryStruct,
  },
];

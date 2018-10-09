import FileReader from '../../../classes/FileReader';
import { BATTERY } from '../../item_types';
import defaultHeader from './default_header';
import boxStruct from './box_struct';

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
    block: boxStruct,
  },
];

import FileReader from '../../../classes/FileReader';
import { BAG } from '../../item_types';
import defaultHeader from './default_header';
import bagStruct from './bag_struct';

export default class ServerItemBagReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemBagReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: BAG,
    header: defaultHeader,
    block: bagStruct,
  },
];

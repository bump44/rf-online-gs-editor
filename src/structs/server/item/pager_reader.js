import FileReader from '../../../classes/FileReader';
import { PAGER } from '../../item_types';
import defaultHeader from './default_header';
import pagerStruct from './pager_struct';

export default class ServerItemPagerReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemPagerReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: PAGER,
    header: defaultHeader,
    block: pagerStruct,
  },
];

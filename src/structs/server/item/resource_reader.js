import FileReader from '../../../classes/FileReader';
import { RESOURCE } from '../../item_types';
import defaultHeader from './default_header';
import resourceStruct from './resource_struct';

export default class ServerItemResourceReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemResourceReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: RESOURCE,
    header: defaultHeader,
    block: resourceStruct,
  },
];

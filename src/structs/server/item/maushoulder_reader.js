import FileReader from '../../../classes/FileReader';
import { MAUSHOULDER } from '../../item_types';
import defaultHeader from './default_header';
import maupartStruct from './maupart_struct';

export default class ServerItemMaushoulderReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemMaushoulderReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: MAUSHOULDER,
    header: defaultHeader,
    block: maupartStruct,
  },
];

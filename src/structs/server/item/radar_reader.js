import FileReader from '../../../classes/FileReader';
import { RADAR } from '../../item_types';
import defaultHeader from './default_header';
import radarStruct from './radar_struct';

export default class ServerItemRadarReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemRadarReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: RADAR,
    header: defaultHeader,
    block: radarStruct,
  },
];

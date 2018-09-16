import FileReader from '../../../classes/FileReader';
import { FACE } from '../../item_types';
import defaultHeader from './default_header';
import faceStruct from './face_struct';

export default class ServerItemFaceReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemFaceReader',
      struct,
    });
  }
}

const struct = [
  {
    type: FACE,
    header: defaultHeader,
    block: faceStruct,
  },
];

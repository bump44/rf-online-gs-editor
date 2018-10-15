import FileReader from '../../../classes/FileReader';
import defaultHeader from './default_header';
import portalStruct from './portal_struct';

export default class ServerMapportalReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerMapportalReader',
      struct,
    });
  }
}

export const struct = [
  {
    header: defaultHeader,
    block: portalStruct,
  },
];

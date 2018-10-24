import FileReader from '~/classes/FileReader';
import defaultHeader from './default_header';
import activeStruct from './active_struct';

export default class ServerMapactiveReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerMapactiveReader',
      struct,
    });
  }
}

export const struct = [
  {
    header: defaultHeader,
    block: activeStruct,
  },
];

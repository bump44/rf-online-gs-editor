import FileReader from '../../../classes/FileReader';
import { QUEST } from '../../item_types';
import defaultHeader from './default_header';
import questStruct from './quest_struct';

export default class ServerItemQuestReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemQuestReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: QUEST,
    header: defaultHeader,
    block: questStruct,
  },
];

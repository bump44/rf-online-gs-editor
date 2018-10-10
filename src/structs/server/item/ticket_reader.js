import FileReader from '../../../classes/FileReader';
import { TICKET } from '../../item_types';
import defaultHeader from './default_header';
import ticketStruct from './ticket_struct';

export default class ServerItemTicketReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemTicketReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: TICKET,
    header: defaultHeader,
    block: ticketStruct,
  },
];

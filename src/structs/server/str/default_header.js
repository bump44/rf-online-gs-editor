import Field from '../../../classes/Field';
import { COUNT, BLOCK_SIZE, COUNT_COLUMNS } from '../../../classes/constants';

export default [
  new Field({ name: COUNT, type: Number, len: 32 }),
  new Field({ name: COUNT_COLUMNS, type: Number, len: 32 }),
  new Field({ name: BLOCK_SIZE, type: Number, len: 32 }),
];

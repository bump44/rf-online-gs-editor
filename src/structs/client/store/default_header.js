import Field from '../../../classes/Field';
import { COUNT, BLOCK_SIZE } from '../../../classes/constants';

export default [
  new Field({ name: COUNT, type: Number, len: 32 }),
  new Field({ name: BLOCK_SIZE, type: Number, len: 32 }),
];

import Field from '~/classes/Field';
import { ORDER, TOTAL_SIZE, OFFSET } from '~/classes/constants';

export default [
  new Field({ name: ORDER, type: Number, len: 16 }),
  new Field({ name: TOTAL_SIZE, type: Number, len: 32 }),
  new Field({ name: OFFSET, type: Number, len: 32 }),
];

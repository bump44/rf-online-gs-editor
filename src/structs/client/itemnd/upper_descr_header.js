import Field from '~/classes/Field';
import { COUNT } from '~/classes/constants';

export default [
  new Field({ name: '__unknown_skip__', type: Number, len: 32 }),
  new Field({ name: COUNT, type: Number, len: 32 }),
];

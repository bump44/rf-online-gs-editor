import { FACE, UPPER } from '../../item_types';
import defaultHeader from './default_header';
import toolStruct from './tool_struct';
import armorStruct from './armor_struct';

export default [
  {
    type: FACE,
    header: defaultHeader,
    block: toolStruct,
  },
  {
    type: UPPER,
    header: defaultHeader,
    block: armorStruct,
  },
];

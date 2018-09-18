import {
  FACE,
  UPPER,
  LOWER,
  GAUNTLET,
  SHOE,
  HELMET,
  SHIELD,
} from '../../structs/item_types';

import RenderFace from './Render/Face';
import RenderArmor from './Render/Armor';

export default {
  [FACE]: RenderFace,
  [UPPER]: RenderArmor,
  [LOWER]: RenderArmor,
  [GAUNTLET]: RenderArmor,
  [SHOE]: RenderArmor,
  [HELMET]: RenderArmor,

  [SHIELD]: RenderArmor,
};

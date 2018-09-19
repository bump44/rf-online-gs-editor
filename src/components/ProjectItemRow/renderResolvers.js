import {
  FACE,
  UPPER,
  LOWER,
  GAUNTLET,
  SHOE,
  HELMET,
  SHIELD,
  WEAPON,
  CLOAK,
  RING,
  AMULET,
} from '../../structs/item_types';

import RenderFace from './Render/Face';
import RenderArmor from './Render/Armor';
import RenderWeapon from './Render/Weapon';
import RenderJewelry from './Render/Jewelry';

export default {
  [FACE]: RenderFace,
  [UPPER]: RenderArmor,
  [LOWER]: RenderArmor,
  [GAUNTLET]: RenderArmor,
  [SHOE]: RenderArmor,
  [HELMET]: RenderArmor,
  [WEAPON]: RenderWeapon,
  [SHIELD]: RenderArmor,
  [CLOAK]: RenderArmor,
  [RING]: RenderJewelry,
  [AMULET]: RenderJewelry,
};

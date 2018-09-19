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
  BULLET,
  MAKETOOL,
} from '../../structs/item_types';

import RenderTool from './Render/Tool';
import RenderArmor from './Render/Armor';
import RenderWeapon from './Render/Weapon';
import RenderJewelry from './Render/Jewelry';
import RenderBullet from './Render/Bullet';

export default {
  [FACE]: RenderTool,
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
  [BULLET]: RenderBullet,
  [MAKETOOL]: RenderTool,
};

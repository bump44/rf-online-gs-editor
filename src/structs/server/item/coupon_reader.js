import FileReader from '~/classes/FileReader';
import { COUPON } from '~/structs/item_types';
import defaultHeader from './default_header';
import couponStruct from './coupon_struct';

export default class ServerItemCouponReader extends FileReader {
  constructor(props = {}) {
    super({
      ...props,
      name: 'ServerItemCouponReader',
      struct,
    });
  }
}

export const struct = [
  {
    type: COUPON,
    header: defaultHeader,
    block: couponStruct,
  },
];

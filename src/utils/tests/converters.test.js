import { readFileSync } from 'fs';
import path from 'path';

import {
  getClientCode,
  getClientCodeAvoidError,
  getEffect25PresentValue,
  DEFENCE_FACING_FALLBACK_VALUE,
  getDefenceFacingPresentValue,
  getDefenctFacingUnpresentValue,
} from '../converters';

/**
 * Test converters
 */

describe('converters', () => {
  it('test getClientCode', () => {
    const schemaPath = path.resolve(
      __dirname,
      './__converters__/codes_schema.json',
    );

    const codesSchema = JSON.parse(readFileSync(schemaPath).toString());

    codesSchema.forEach(codeSchema => {
      expect(getClientCode(codeSchema.server)).toEqual(
        codeSchema.client
          .split(/(.{2})/g)
          .reverse()
          .join(''),
      );
    });
  });

  it('test getClientCodeAvoidError', () => {
    const values = [
      [undefined, null],
      [null, null],
      ['01iyyyy', null],
      ['iyyyy01', getClientCode('iyyyy01')],
    ];

    values.forEach(vals =>
      expect(getClientCodeAvoidError(vals[0])).toEqual(vals[1]),
    );
  });

  it('test getEffect25PresentValue', () => {
    const values = [
      [-300, 0.3],
      [-310, 0.31],
      [0, 0],
      ['', 0],
      [null, 0],
      [undefined, NaN],
    ];

    values.forEach(vals =>
      expect(getEffect25PresentValue(vals[0])).toEqual(vals[1]),
    );
  });

  it('test DEFENCE_FACING_FALLBACK_VALUE', () => {
    expect(DEFENCE_FACING_FALLBACK_VALUE).toEqual(1);
  });

  it('test getDefenceFacingPresentValue', () => {
    const values = [
      [{ defFacing: 0, defGap: 0.5 }, 35],
      [{ defFacing: 0.1 }, 203],
      [{ defFacing: 0.5 }, 59],
      [{ defFacing: -100 }, 35],
      [{ defFacing: 0.5, defGap: 1.5 }, 60],
    ];

    values.forEach(vals =>
      expect(getDefenceFacingPresentValue(vals[0])).toEqual(vals[1]),
    );
  });

  it('test getDefenctFacingUnpresentValue', () => {
    const values = [
      [{ presentValue: 0, defGap: 0.5 }, 1],
      [{ presentValue: -1, defGap: 0.5 }, 246.22888266898326],
      [{ presentValue: 100 }, 0.2528308094209591],
      [{ presentValue: 520 }, 0.02949434680548046],
      [{ presentValue: 1000, defGap: 1.5 }, 0.012613845580560765],
    ];

    values.forEach(vals =>
      expect(getDefenctFacingUnpresentValue(vals[0])).toEqual(vals[1]),
    );
  });
});

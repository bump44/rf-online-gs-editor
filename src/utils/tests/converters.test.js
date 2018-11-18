import { createReadStream } from 'fs';
import path from 'path';
import csv from 'csv-parser';

import {
  getClientCode,
  getClientCodeAvoidError,
  getEffect25PresentValue,
  DEFENCE_FACING_FALLBACK_VALUE,
  getDefenceFacingPresentValue,
  getDefenctFacingUnpresentValue,
  convItemModelClientToServer,
  convItemModelServerToClient,
} from '../converters';

/**
 * Test converters
 */

let itemModels = [];
let itemCodes = [];

async function readCsv(fileName) {
  const results = [];
  await new Promise((res, rej) => {
    createReadStream(
      path.resolve(__dirname, './__converters__', `${fileName}.csv`),
    )
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', res)
      .on('error', rej);
  });
  return results;
}

describe('converters', () => {
  beforeEach(async () => {
    itemModels = await readCsv('item_models');
    itemCodes = await readCsv('item_codes');
  });

  afterEach(async () => {
    itemModels = [];
    itemCodes = [];
  });

  it('test getClientCode', () => {
    itemCodes.forEach(itemCode => {
      expect(getClientCode(itemCode.server)).toEqual(itemCode.client);
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

  it('test convItemModelClientToServer', () => {
    itemModels.forEach(itemModel => {
      expect(convItemModelClientToServer(itemModel.client)).toEqual(
        itemModel.server,
      );
    });
  });

  it('test convItemModelServerToClient', () => {
    itemModels.forEach(itemModel => {
      expect(convItemModelServerToClient(itemModel.server)).toEqual(
        itemModel.client,
      );
    });
  });
});

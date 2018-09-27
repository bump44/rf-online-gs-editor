import { readFileSync } from 'fs';
import path from 'path';
import { getClientCode } from '../converters';

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
});

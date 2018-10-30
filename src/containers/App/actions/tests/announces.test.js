import immutable from 'immutable';
import { random } from 'lodash';

import {
  announceProjectCountItems,
  announceProjectCountStores,
  announceProjectCountBoxItemOuts,
  announceProjectCountHandler,
} from '../announces';

import {
  ANNOUNCE_PROJECT_COUNT_ITEMS,
  ANNOUNCE_PROJECT_COUNT_STORES,
  ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS,
} from '../../constants';

describe('App actions', () => {
  describe('Announces', () => {
    // announceProjectCountItems
    describe('announceProjectCountItems', () => {
      it('has a type of ANNOUNCE_PROJECT_COUNT_ITEMS', () => {
        expect(announceProjectCountItems({}).type).toEqual(
          ANNOUNCE_PROJECT_COUNT_ITEMS,
        );
      });
      it('has a contains expected values', () => {
        const expectedValues = Array.from(Array(3)).map(() => ({
          type: ANNOUNCE_PROJECT_COUNT_ITEMS,
          count: random(10, 99),
          id: random(10, 99),
        }));
        expectedValues.forEach(expectedValue =>
          expect(announceProjectCountItems(expectedValue)).toEqual(
            expectedValue,
          ),
        );
      });
    });
    // announceProjectCountStores
    describe('announceProjectCountStores', () => {
      it('has a type of ANNOUNCE_PROJECT_COUNT_STORES', () => {
        expect(announceProjectCountStores({}).type).toEqual(
          ANNOUNCE_PROJECT_COUNT_STORES,
        );
      });
      it('has a contains expected values', () => {
        const expectedValues = Array.from(Array(3)).map(() => ({
          type: ANNOUNCE_PROJECT_COUNT_STORES,
          count: random(10, 99),
          id: random(10, 99),
        }));
        expectedValues.forEach(expectedValue =>
          expect(announceProjectCountStores(expectedValue)).toEqual(
            expectedValue,
          ),
        );
      });
    });
    // announceProjectCountBoxItemOuts
    describe('announceProjectCountBoxItemOuts', () => {
      it('has a type of ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS', () => {
        expect(announceProjectCountBoxItemOuts({}).type).toEqual(
          ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS,
        );
      });
      it('has a contains expected values', () => {
        const expectedValues = Array.from(Array(3)).map(() => ({
          type: ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS,
          count: random(10, 99),
          id: random(10, 99),
        }));
        expectedValues.forEach(expectedValue =>
          expect(announceProjectCountBoxItemOuts(expectedValue)).toEqual(
            expectedValue,
          ),
        );
      });
    });
    // announceProjectCountHandler
    describe('announceProjectCountHandler', () => {
      it('should return invalid (payload) state', () => {
        const invalid = [null, undefined, false, 0, true];
        invalid.forEach(state =>
          expect(announceProjectCountHandler(state)).toEqual(state),
        );
      });
      it('should return valid (payload) state by id != id', () => {
        const valid = immutable.Map({ id: 4 });
        expect(announceProjectCountHandler(valid, { id: 10 })).toEqual(valid);
      });
      it('should return valid (payload) state by action not defined', () => {
        const valid = immutable.Map({ id: 4 });
        expect(announceProjectCountHandler(valid, { id: 4 })).toEqual(valid);
      });
      it('should return valid new state with new count data', () => {
        const valid = immutable.Map({ id: 4 });
        const actions = [
          {
            type: ANNOUNCE_PROJECT_COUNT_BOXITEMOUTS,
            key: 'boxItemOuts',
          },
          {
            type: ANNOUNCE_PROJECT_COUNT_ITEMS,
            key: 'items',
          },
          {
            type: ANNOUNCE_PROJECT_COUNT_STORES,
            key: 'stores',
          },
        ];

        actions.forEach(action =>
          expect(
            announceProjectCountHandler(valid, {
              id: 4,
              count: 500,
              type: action.type,
            }).equals(valid.setIn([action.key, 'total'], 500)),
          ).toBeTruthy(),
        );
      });
    });
  });
});

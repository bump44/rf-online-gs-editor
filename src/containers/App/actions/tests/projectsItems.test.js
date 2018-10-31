import {
  projectsItems,
  projectsItemsActionNames,
  projectsItemsBindActions,
} from '../projectsItems';

import { PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE, ITEM } from '../../constants';

describe('App actions', () => {
  describe('ProjectsItems', () => {
    it('has a type of PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE & subType ITEM', () => {
      Object.keys(projectsItems).forEach(propKey => {
        const action = projectsItems[propKey];
        const result = action();
        expect(result.type).toEqual(PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE);
        expect(result.subType).toEqual(ITEM);
      });
    });
    it('projectsItems should contain projectsItemsActionNames key', () => {
      const keys = Object.keys(projectsItems);
      projectsItemsActionNames.forEach(propKey =>
        expect(keys).toContain(propKey),
      );
    });
    it('bind should contain projectId & additionalData', () => {
      const actions = projectsItemsBindActions({
        projectId: 'projectId',
        additionalData: { list: [0] },
        dispatch: args => {
          expect(args.projectId).toEqual('projectId');
          expect(args.additionalData.list.length).toBe(1);
          return args;
        },
      });

      const keys = Object.keys(actions);

      Object.keys(actions).forEach(propKey => {
        const action = actions[propKey];
        const result = action();

        expect(keys).toContain(propKey);
        expect(result.type).toBeDefined();
        expect(result.projectId).toBeDefined();
        expect(result.propKey).toBeDefined();
        expect(result.additionalData).toBeDefined();
        expect(result.subType).toBeDefined();
      });
    });
    it('bind should contain default projectId & additionalData', () => {
      const actions = projectsItemsBindActions({});
      Object.keys(actions).forEach(propKey => {
        const action = actions[propKey];
        const result = action();
        expect(result.projectId).toBeUndefined();
        expect(result.additionalData).toEqual({});
      });
    });
  });
});

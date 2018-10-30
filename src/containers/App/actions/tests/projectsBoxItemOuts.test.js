import {
  projectsBoxItemOuts,
  projectsBoxItemOutsActionNames,
  projectsBoxItemOutsBindActions,
} from '../projectsBoxItemOuts';

import {
  PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE,
  BOXITEMOUT,
} from '../../constants';

describe('App actions', () => {
  describe('ProjectsBoxItemOuts', () => {
    it('has a type of PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE & subType BOXITEMOUT', () => {
      Object.keys(projectsBoxItemOuts).forEach(propKey => {
        const action = projectsBoxItemOuts[propKey];
        const result = action();
        expect(result.type).toEqual(PROJECTS_NEXT_VALUES_CHANGE_PROP_VALUE);
        expect(result.subType).toEqual(BOXITEMOUT);
      });
    });
    it('projectsBoxItemOuts should contain projectsBoxItemOutsActionNames key', () => {
      const keys = Object.keys(projectsBoxItemOuts);
      projectsBoxItemOutsActionNames.forEach(propKey =>
        expect(keys).toContain(propKey),
      );
    });
    it('bind should contain projectId & additionalData', () => {
      const actions = projectsBoxItemOutsBindActions({
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
      const actions = projectsBoxItemOutsBindActions({});
      Object.keys(actions).forEach(propKey => {
        const action = actions[propKey];
        const result = action();
        expect(result.projectId).toBeUndefined();
        expect(result.additionalData).toEqual({});
      });
    });
  });
});

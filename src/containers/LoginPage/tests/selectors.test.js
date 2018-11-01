import { fromJS } from 'immutable';
import makeSelectLoginPage, { selectLoginPageDomain } from '../selectors';

describe('selectLoginPageDomain', () => {
  it('returns the initial state', () => {
    expect(selectLoginPageDomain(fromJS({}))).toMatchSnapshot();
  });
  it('returns the loginPage state', () => {
    expect(
      selectLoginPageDomain(
        fromJS({
          loginPage: { test: 1, value: 2 },
        }),
      ),
    ).toMatchSnapshot();
  });
  it('returns the loginPage state object', () => {
    expect(
      makeSelectLoginPage()(
        fromJS({
          loginPage: { test: 1, value: 2 },
        }),
      ),
    ).toMatchSnapshot();
  });
});

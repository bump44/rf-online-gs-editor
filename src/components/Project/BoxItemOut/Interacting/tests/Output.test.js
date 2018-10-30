import { merge } from 'lodash';
import { shallow } from 'enzyme';
import immutable from 'immutable';
import React from 'react';

import ProjectBoxItemOutInteractingOutput from '../Output';

function getRequiredProps(nextProps = {}) {
  return merge(
    {
      boxItemOut: immutable.Map({}),
      boxItemOutNextValues: immutable.Map({}),
      boxItemOutActions: {},
      localSettings: immutable.Map({}),
      nextValues: immutable.Map({}),
      itemActions: {},
      moneyTypes: immutable.List([]),
      itemGradeTypes: immutable.List([]),
      weaponTypes: immutable.List([]),
      entriesFinderItems: immutable.Map({}),
      entriesFinderItemsActions: {
        changeFilterSortBy: () => undefined,
        changeFilterSortWay: () => undefined,
        changeFilterWhereSearch: () => undefined,
        changeFilterWhereType: () => undefined,
        changeFilterTakeSkip: () => undefined,
      },
      index: 0,
    },
    nextProps,
  );
}

describe('<ProjectBoxItemOutInteractingOutput />', () => {
  it('Should exist', () => {
    const props = getRequiredProps();
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render item', () => {
    const props = getRequiredProps({
      boxItemOut: immutable.Map({
        strItemCode__1_1: 'iyyyy01',
        nItemCount__1_2: 99,
        nItemProb__1_3: 10000,
        items: immutable.fromJS([
          {
            server: {
              strCode: 'iyyyy01',
              strName: 'Item title',
            },
          },
        ]),
      }),
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should click disable', () => {
    const props = getRequiredProps({
      boxItemOutActions: {
        outputDisable: jest.fn((obj, n) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().onClickDisable();
    expect(props.boxItemOutActions.outputDisable.mock.calls.length).toBe(1);
  });
  it('Should change outputCode', () => {
    const nextCode = 'value';
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputCode: jest.fn((obj, { n, code }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(code).toEqual(nextCode);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().changeOutputCode({ target: { value: nextCode } });
    expect(props.boxItemOutActions.changeOutputCode.mock.calls.length).toBe(1);
  });
  it('Should change outputCount', () => {
    const nextCount = 50;
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputCount: jest.fn((obj, { n, count }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(count).toEqual(nextCount);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().changeOutputCount({ target: { value: nextCount } });
    expect(props.boxItemOutActions.changeOutputCount.mock.calls.length).toBe(1);
  });
  it('Should change outputCount to 0', () => {
    const nextCount = [NaN, null, undefined, 'string'];
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputCount: jest.fn((obj, { n, count }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(count).toEqual(0);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    nextCount.forEach(value =>
      wrapper.instance().changeOutputCount({ target: { value } }),
    );
    expect(props.boxItemOutActions.changeOutputCount.mock.calls.length).toBe(
      nextCount.length,
    );
  });
  it('Should change outputProb', () => {
    const nextProb = 500;
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputProb: jest.fn((obj, { n, prob }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(prob).toEqual(nextProb);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().changeOutputProb({ target: { value: nextProb } });
    expect(props.boxItemOutActions.changeOutputProb.mock.calls.length).toBe(1);
  });
  it('Should change outputProb to 0', () => {
    const nextProb = [NaN, null, undefined, 'string'];
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputProb: jest.fn((obj, { n, prob }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(prob).toEqual(0);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    nextProb.forEach(value =>
      wrapper.instance().changeOutputProb({ target: { value } }),
    );
    expect(props.boxItemOutActions.changeOutputProb.mock.calls.length).toBe(
      nextProb.length,
    );
  });
  it('Should change outputProbPercent', () => {
    const nextProbPercent = 50;
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputProb: jest.fn((obj, { n, prob }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(prob).toEqual(parseInt((10000 / 100) * nextProbPercent, 10));
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();

    wrapper
      .instance()
      .changeOutputProbPercent({ target: { value: nextProbPercent } });

    expect(props.boxItemOutActions.changeOutputProb.mock.calls.length).toBe(1);
  });
  it('Should change outputProbPercent to 1', () => {
    const nextProbPercent = [NaN, null, undefined, 'string'];
    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputProb: jest.fn((obj, { n, prob }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(prob).toEqual(1);
        }),
      },
    });
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();

    nextProbPercent.forEach(value =>
      wrapper.instance().changeOutputProbPercent({ target: { value } }),
    );

    expect(props.boxItemOutActions.changeOutputProb.mock.calls.length).toBe(
      nextProbPercent.length,
    );
  });
  it('Should toggle selectItemModalOpen', () => {
    const props = getRequiredProps();
    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('selectItemModalOpen')).toBeFalsy();
    wrapper.instance().toggleSelectItemModal();
    expect(wrapper.state('selectItemModalOpen')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
  it('Should select item', () => {
    const nextItem = immutable.fromJS({
      server: {
        strCode: 'iyyyy01',
      },
    });

    const props = getRequiredProps({
      boxItemOutActions: {
        changeOutputCode: jest.fn((obj, { n, code }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(code).toEqual(nextItem.getIn(['server', 'strCode']));
        }),
        changeOutputItem: jest.fn((obj, { n, item }) => {
          expect(obj).toBeInstanceOf(immutable.Map);
          expect(n).toBe(1);
          expect(nextItem.equals(item)).toBeTruthy();
        }),
      },
    });

    const wrapper = shallow(<ProjectBoxItemOutInteractingOutput {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().itemListSelected(nextItem, immutable.Map({}));
    expect(props.boxItemOutActions.changeOutputCode.mock.calls.length).toBe(1);
    expect(props.boxItemOutActions.changeOutputItem.mock.calls.length).toBe(1);
  });
});

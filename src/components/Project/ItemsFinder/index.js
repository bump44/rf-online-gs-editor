/**
 *
 * ProjectItemsFinder
 *
 */

import { Map, List } from 'immutable';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS,
  ITEM,
  IMMUTABLE_MAP,
  IMMUTABLE_LIST,
} from '~/containers/App/constants';

import ProjectItemsFilters from '../ItemsFilters';
import InfiniteAutoSizeList from '../../InfiniteAutoSizeList';
import ProjectItemVirtualizedRow from '../ItemVirtualizedRow';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemsFinder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getFilterValues = this.getFilterValues.bind(this);
    this.renderFilters = this.renderFilters.bind(this);

    this.onClickSelect = this.onClickSelect.bind(this);

    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }

  componentWillMount() {
    this.loadMoreRows({ startIndex: 0, stopIndex: 25 });
  }

  componentWillReceiveProps(nextProps) {
    const { state } = this.props;
    const result = state.get('result', IMMUTABLE_MAP);

    if (
      !result.get('items', IMMUTABLE_LIST).count() !==
        nextProps.state
          .get('result', IMMUTABLE_MAP)
          .get('items', IMMUTABLE_LIST)
          .count() &&
      this.infiniteAutoSizeList
    ) {
      this.infiniteAutoSizeList.forceUpdateGrid();
    }
  }

  onClickSelect(item, itemNextValues) {
    const { onClickSelect } = this.props;
    if (onClickSelect) {
      onClickSelect(item, itemNextValues);
    }
  }

  getFilterValues() {
    const { state } = this.props;

    const filter = PROJECTS_ENTRIES_FINDER_STATE_DEFAULTS[ITEM].get(
      'filter',
    ).mergeDeep(state.get('filter', IMMUTABLE_MAP));

    const take = filter.get('take');
    const skip = filter.get('skip');
    const sortBy = filter.get('sortBy');
    const sortWay = filter.get('sortWay');
    const whereSearch = filter.getIn(['where', 'search']);
    const whereType = filter.getIn(['where', 'type']);

    return {
      take,
      skip,
      sortBy,
      sortWay,
      whereSearch,
      whereType,
    };
  }

  isRowLoaded({ index }) {
    const { state } = this.props;
    const result = state.get('result', IMMUTABLE_MAP);
    return !!result.get('items', IMMUTABLE_LIST).get(index);
  }

  loadMoreRows({ startIndex, stopIndex }) {
    const { actions } = this.props;
    actions.changeFilterTakeSkip(stopIndex - startIndex + 1, startIndex);
    return Promise.delay(150);
  }

  rowRenderer({ key, ...props }) {
    const {
      state,
      nextValues,
      itemActions,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      localSettings,
      selectable,
    } = this.props;

    const result = state.get('result', IMMUTABLE_MAP);
    const items = result.get('items', IMMUTABLE_LIST);
    const componentProps = {};

    if (selectable) {
      componentProps.selectable = true;
      componentProps.onClickSelect = this.onClickSelect;
    }

    return (
      <ProjectItemVirtualizedRow
        {...props}
        key={key}
        items={items}
        nextValues={nextValues}
        itemActions={itemActions}
        moneyTypes={moneyTypes}
        itemGradeTypes={itemGradeTypes}
        weaponTypes={weaponTypes}
        localSettings={localSettings}
        {...componentProps}
      />
    );
  }

  renderFilters() {
    const { actions, state } = this.props;

    return (
      <ProjectItemsFilters
        {...this.getFilterValues()}
        onChangeSortBy={actions.changeFilterSortBy}
        onChangeSortWay={actions.changeFilterSortWay}
        onChangeWhereType={actions.changeFilterWhereType}
        onChangeWhereSearch={actions.changeFilterWhereSearch}
        loading={!!state.get('isLoading')}
      />
    );
  }

  render() {
    const { state } = this.props;
    const result = state.get('result', IMMUTABLE_MAP);

    return (
      <React.Fragment>
        <div className="mb-15">{this.renderFilters()}</div>
        <InfiniteAutoSizeList
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowHeight={80}
          rowRenderer={this.rowRenderer}
          rowCount={result.get('total', 0)}
          ref={infiniteAutoSizeList => {
            this.infiniteAutoSizeList = infiniteAutoSizeList;
            return this.infiniteAutoSizeList;
          }}
        />
      </React.Fragment>
    );
  }
}

ProjectItemsFinder.propTypes = {
  nextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,

  selectable: PropTypes.bool,
  onClickSelect: PropTypes.func,

  state: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.shape({
    changeFilterSortBy: PropTypes.func.isRequired,
    changeFilterSortWay: PropTypes.func.isRequired,
    changeFilterWhereSearch: PropTypes.func.isRequired,
    changeFilterWhereType: PropTypes.func.isRequired,
    changeFilterTakeSkip: PropTypes.func.isRequired,
  }).isRequired,
};

ProjectItemsFinder.defaultProps = {
  selectable: false,
  onClickSelect: undefined,
};

export default ProjectItemsFinder;

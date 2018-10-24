/**
 *
 * ProjectStoreVirtualizedRow
 *
 */

import { Dimmer, Loader } from 'semantic-ui-react';
import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {
  DISABLE_RENDER_ITEMS_IS_SCROLLING,
  DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
} from '~/containers/App/constants';

import Row from '../StoreRow/styles';
import ProjectStoreRow from '../StoreRow';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreVirtualizedRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow() {
    const {
      index,
      stores,
      storeActions,
      nextValues,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      localSettings,
      isScrolling,
      isVisible,
    } = this.props;

    const disableRenderItemsIsScrolling = localSettings.get(
      DISABLE_RENDER_ITEMS_IS_SCROLLING,
    );

    const disableRenderItemsIsNotVisible = localSettings.get(
      DISABLE_RENDER_ITEMS_IS_NOT_VISIBLE,
    );

    if (disableRenderItemsIsNotVisible && !isVisible) {
      return null;
    }

    const store = stores.get(index);

    if (store && !(disableRenderItemsIsScrolling && isScrolling)) {
      const storeNextValues = nextValues.get(store.get('id'), Map({}));

      return (
        <ProjectStoreRow
          nextValues={nextValues}
          storeActions={storeActions}
          store={store}
          storeNextValues={storeNextValues}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
        />
      );
    }

    return (
      <Row>
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      </Row>
    );
  }

  render() {
    const { style } = this.props;
    return <div style={style}>{this.renderRow()}</div>;
  }
}

ProjectStoreVirtualizedRow.propTypes = {
  index: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  stores: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default ProjectStoreVirtualizedRow;

/**
 *
 * ProjectStoreSegmentLimItemsList
 *
 */

import { FormattedMessage } from 'react-intl';
import { Map, List } from 'immutable';
import { Segment, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';
import ProjectStoreInteractingItemsList from '../Interacting/ItemsList';
import ProjectStoreInteractingItemsListCount from '../Interacting/ItemsListCount';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreSegmentLimItemsList extends React.PureComponent {
  render() {
    const {
      style,
      store,
      storeNextValues,
      nextValues,
      storeActions,
      itemActions,
      localSettings,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    return (
      <Segment style={style}>
        <ProjectStoreInteractingItemsListCount
          store={store}
          storeNextValues={storeNextValues}
          onChangeValue={storeActions.changeLimItemsListCount}
          label={
            <Label>
              <FormattedMessage {...messages.VendorItemsListCount} />
            </Label>
          }
          fluid={false}
          className="mb-15"
          isLimitedList
        />

        <ProjectStoreInteractingItemsList
          store={store}
          storeNextValues={storeNextValues}
          storeActions={storeActions}
          nextValues={nextValues}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          entriesFinderItems={entriesFinderItems}
          entriesFinderItemsActions={entriesFinderItemsActions}
          isLimitedList
        />
      </Segment>
    );
  }
}

ProjectStoreSegmentLimItemsList.propTypes = {
  resourceActions: PropTypes.object.isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  style: PropTypes.object,
  storeActions: PropTypes.object.isRequired,
  itemActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
};

ProjectStoreSegmentLimItemsList.defaultProps = {
  style: {},
};

export default ProjectStoreSegmentLimItemsList;

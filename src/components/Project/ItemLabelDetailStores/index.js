/**
 *
 * ProjectItemLabelDetailStores
 *
 */

import { FormattedMessage } from 'react-intl';
import { Label, Icon, Popup } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';

function ProjectItemLabelDetailStores({ item, itemNextValues, size }) {
  const nextValue = itemNextValues.getIn(['nextValue', 'stores', 'total']);
  const currValue = item.getIn(['stores', 'total']) || 0;

  const total = nextValue !== undefined ? nextValue : currValue;
  const stores = item.getIn(['stores', 'items']);

  return (
    <Popup
      trigger={
        <Label color="blue" size={size}>
          <Icon name="shop" />
          {total}
        </Label>
      }
      content={
        <div>
          <div className={total <= 0 ? '' : 'mb-10'}>
            <FormattedMessage {...messages.message} values={{ total }} />
          </div>

          {stores &&
            stores.map(store => (
              <Label image key={store.get('id')} color="black" className="mb-5">
                {store.getIn(['client', 'strStoreNPCname'])}
                <Label.Detail>
                  {store.getIn(['client', 'strStoreNPClastName'])}
                </Label.Detail>
              </Label>
            ))}
        </div>
      }
      inverted
      size="tiny"
    />
  );
}

ProjectItemLabelDetailStores.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
};

ProjectItemLabelDetailStores.defaultProps = {
  size: 'tiny',
};

export default ProjectItemLabelDetailStores;

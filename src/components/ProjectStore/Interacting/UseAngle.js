/**
 *
 * ProjectStoreInteractingUseAngle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import * as projectStore from '../../../containers/App/getters/projectStore';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingUseAngle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;

    const value = projectStore.getUseAngle(itemNextValues.get('nextValue'), {
      item,
    });

    return (
      <FormattedMessage {...messages.UseAngle}>
        {message => (
          <Checkbox
            label={message}
            value={1}
            checked={!!value}
            onChange={this.changeValue}
            className={className}
          />
        )}
      </FormattedMessage>
    );
  }
}

ProjectStoreInteractingUseAngle.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectStoreInteractingUseAngle.defaultProps = {
  className: '',
};

export default ProjectStoreInteractingUseAngle;

/**
 *
 * ProjectStoreInteractingUseAngle
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import * as projectStore from 'containers/App/getters/projectStore';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingUseAngle extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, owns.checked);
    };
  }

  render() {
    const { store, storeNextValues, className } = this.props;

    const value = projectStore.getUseAngle(storeNextValues.get('nextValue'), {
      entry: store,
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
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectStoreInteractingUseAngle.defaultProps = {
  className: '',
};

export default ProjectStoreInteractingUseAngle;

/**
 *
 * ProjectItemInteractingExchange
 *
 */

import PropTypes from 'prop-types';
import React from 'react';

import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { getExchange } from '~/containers/App/getters/projectItem';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingExchange extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;
    const value = getExchange(itemNextValues.get('nextValue'), { entry: item });

    return (
      <FormattedMessage {...messages.Exchange}>
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

ProjectItemInteractingExchange.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingExchange.defaultProps = {
  className: '',
};

export default ProjectItemInteractingExchange;

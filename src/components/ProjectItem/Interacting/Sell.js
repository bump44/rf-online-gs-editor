/**
 *
 * ProjectItemInteractingSell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { getSell } from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingSell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;
    const value = getSell(itemNextValues.get('nextValue'), { entry: item });

    return (
      <FormattedMessage {...messages.Sell}>
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

ProjectItemInteractingSell.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingSell.defaultProps = {
  className: '',
};

export default ProjectItemInteractingSell;

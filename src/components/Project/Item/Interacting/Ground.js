/**
 *
 * ProjectItemInteractingGround
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { getGround } from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingGround extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;
    const value = getGround(itemNextValues.get('nextValue'), { entry: item });

    return (
      <FormattedMessage {...messages.Ground}>
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

ProjectItemInteractingGround.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingGround.defaultProps = {
  className: '',
};

export default ProjectItemInteractingGround;

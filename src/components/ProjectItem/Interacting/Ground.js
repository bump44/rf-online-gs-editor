/**
 *
 * ProjectItemInteractingGround
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Checkbox } from 'semantic-ui-react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

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

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'bGround']);

    const currValue = item.getIn(
      [['server', 'bGround'], ['client', 'bGround']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'bGround'],
      false,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

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

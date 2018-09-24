/**
 *
 * ProjectItemInteractingStoragePossible
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
class ProjectItemInteractingStoragePossible extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'bStoragePossible',
    ]);

    const currValue = item.getIn(
      [['server', 'bStoragePossible'], ['client', 'bStoragePossible']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'bStoragePossible'],
      false,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <FormattedMessage {...messages.StoragePossible}>
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

ProjectItemInteractingStoragePossible.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingStoragePossible.defaultProps = {
  className: '',
};

export default ProjectItemInteractingStoragePossible;

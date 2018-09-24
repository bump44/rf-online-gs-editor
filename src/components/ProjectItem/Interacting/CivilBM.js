/**
 *
 * ProjectItemInteractingCivilBM
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Checkbox } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingCivilBM extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'civil_bm']);

    const currValue = item.getIn(
      [['server', 'civil_bm'], ['client', 'civil_bm']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'civil_bm'],
      false,
    );

    const value = nextValue !== undefined ? nextValue : currValue;

    return (
      <FormattedMessage {...messages.CivilBM}>
        {message => (
          <Checkbox
            label={message}
            value={1}
            checked={!!value}
            onChange={this.changeValue}
          />
        )}
      </FormattedMessage>
    );
  }
}

ProjectItemInteractingCivilBM.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default ProjectItemInteractingCivilBM;

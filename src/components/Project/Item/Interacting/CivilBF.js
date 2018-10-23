/**
 *
 * ProjectItemInteractingCivilBF
 *
 */

import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { getCivilBF } from 'containers/App/getters/projectItem';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingCivilBF extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;
    const value = getCivilBF(itemNextValues.get('nextValue'), { entry: item });

    return (
      <FormattedMessage {...messages.CivilBF}>
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

ProjectItemInteractingCivilBF.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingCivilBF.defaultProps = {
  className: '',
};

export default ProjectItemInteractingCivilBF;

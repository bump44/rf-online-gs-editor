/**
 *
 * ProjectItemInteractingCivilCM
 *
 */

import { Checkbox } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { getCivilCM } from '~/containers/App/getters/projectItem';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingCivilCM extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, owns.checked);
    };
  }

  render() {
    const { item, itemNextValues, className } = this.props;
    const value = getCivilCM(itemNextValues.get('nextValue'), { entry: item });

    return (
      <FormattedMessage {...messages.CivilCM}>
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

ProjectItemInteractingCivilCM.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingCivilCM.defaultProps = {
  className: '',
};

export default ProjectItemInteractingCivilCM;

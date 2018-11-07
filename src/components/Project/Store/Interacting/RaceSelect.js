/**
 *
 * ProjectStoreInteractingRaceSelect
 *
 */

import { Dropdown } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import { getRace } from '~/containers/App/getters/projectStore';

const options = [
  { key: 'all', value: -1, text: <FormattedMessage {...messages.All} /> },
  { key: 'bel', value: 0, text: <FormattedMessage {...messages.Bellato} /> },
  { key: 'cor', value: 1, text: <FormattedMessage {...messages.Cora} /> },
  { key: 'acr', value: 2, text: <FormattedMessage {...messages.Accretia} /> },
];

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingRaceSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, parseInt(owns.value, 10));
    };
  }

  render() {
    const { store, storeNextValues, size, className, fluid } = this.props;

    const value = getRace(storeNextValues.get('nextValue'), {
      entry: store,
    });

    return (
      <Dropdown
        options={options}
        value={value}
        size={size}
        fluid={fluid}
        className={className}
        onChange={this.changeValue}
      />
    );
  }
}

ProjectStoreInteractingRaceSelect.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
};

ProjectStoreInteractingRaceSelect.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
};

export default ProjectStoreInteractingRaceSelect;

/**
 *
 * ProjectStoreInteractingTrade
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Input } from 'semantic-ui-react';
import * as projectStore from '../../../containers/App/getters/projectStore';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingTrade extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, evt.target.value);
    };
  }

  render() {
    const { item, itemNextValues, size, className, label, fluid } = this.props;
    const value = projectStore.getTrade(itemNextValues.get('nextValue'), {
      item,
    });

    return (
      <Input
        size={size}
        fluid={fluid}
        type="number"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={label}
      />
    );
  }
}

ProjectStoreInteractingTrade.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  fluid: PropTypes.bool,
};

ProjectStoreInteractingTrade.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectStoreInteractingTrade;

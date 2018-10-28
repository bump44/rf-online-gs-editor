/**
 *
 * ProjectStoreInteractingCode
 *
 */

import { Input } from 'semantic-ui-react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { convNPCodeClientToServer } from '~/utils/converters';

import {
  getCode,
  getClientCode,
  getServerCode,
} from '~/containers/App/getters/projectStore';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingCode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, evt.target.value);
    };
  }

  render() {
    const {
      store,
      storeNextValues,
      size,
      className,
      label,
      fluid,
    } = this.props;

    const value = getCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    const clientCode = getClientCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    const serverCode = getServerCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    return (
      <Input
        size={size}
        fluid={fluid}
        type="text"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={label}
        error={
          value.length !== 5 ||
          serverCode !== value ||
          serverCode !== convNPCodeClientToServer(clientCode)
        }
      />
    );
  }
}

ProjectStoreInteractingCode.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
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

ProjectStoreInteractingCode.defaultProps = {
  size: 'mini',
  className: '',
  label: null,
  fluid: true,
};

export default ProjectStoreInteractingCode;

import { isPlainObject } from 'lodash';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getMapCode,
  getBdCode,
  getSdCode,
} from '~/containers/App/getters/projectStore';

export default function withActions(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      store: PropTypes.instanceOf(Map).isRequired,
      storeNextValues: PropTypes.instanceOf(Map).isRequired,
      storeActions: PropTypes.shape({
        copyAndRedirect: PropTypes.func.isRequired,
        createMapSpt: PropTypes.func.isRequired,
      }).isRequired,
    };

    constructor(props) {
      super(props);

      this.actions = {
        copyAndRedirect: () => {
          const { store, storeActions } = this.props;
          storeActions.copyAndRedirect(store);
        },
        createMapSpt: (values = {}) => {
          const { store, storeActions } = this.props;
          storeActions.createMapSpt(store, { values });
        },
        createMapSptBd: (values = {}) => {
          const { store, storeActions, storeNextValues } = this.props;
          const mapName = getMapCode(storeNextValues.get('nextValue'), {
            entry: store,
          });
          const strAnchor = getBdCode(storeNextValues.get('nextValue'), {
            entry: store,
          });
          storeActions.createMapSpt(store, {
            values: {
              mapName,
              strAnchor,
              ...(isPlainObject(values) ? values : {}),
            },
          });
        },
        createMapSptSd: (values = {}) => {
          const { store, storeActions, storeNextValues } = this.props;
          const mapName = getMapCode(storeNextValues.get('nextValue'), {
            entry: store,
          });
          const strAnchor = getSdCode(storeNextValues.get('nextValue'), {
            entry: store,
          });
          storeActions.createMapSpt(store, {
            values: {
              mapName,
              strAnchor,
              ...(isPlainObject(values) ? values : {}),
            },
          });
        },
      };
    }

    render() {
      return (
        <WrappedComponent {...this.props} storeWrappedActions={this.actions} />
      );
    }
  };
}

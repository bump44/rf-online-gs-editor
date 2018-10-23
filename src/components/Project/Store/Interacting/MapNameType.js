/**
 *
 * ProjectStoreInteractingMapNameType
 *
 */

import { FormattedMessage } from 'react-intl';
import { Input, Dropdown } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import * as projectStore from 'containers/App/getters/projectStore';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingMapNameType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, store } = this.props;
      onChangeValue(store, owns.value);
    };
  }

  render() {
    const {
      store,
      storeNextValues,
      size,
      className,
      fluid,
      types,
    } = this.props;

    const value = projectStore.getMapCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    const type = projectStore.getMapNameType(storeNextValues.get('nextValue'), {
      entry: store,
      mapNameTypes: types,
    });

    const isUnknown = !type;

    const dropdownText = (() => {
      if (isUnknown) {
        return (
          <span>
            {`${value}: `}
            <FormattedMessage {...messages.UnknownMapNameType} />
          </span>
        );
      }

      return `${type.get('value')}: ${type.get('title')}`;
    })();

    return (
      <Input
        size={size}
        fluid={fluid}
        value={value}
        onChange={this.changeValue}
        className={className}
        label={
          <Dropdown
            text={dropdownText}
            inline
            labeled
            scrolling
            item
            value={value}
          >
            <Dropdown.Menu>
              {isUnknown && (
                <Dropdown.Item
                  selected
                  text={
                    <span>
                      {`${value}: `}
                      <FormattedMessage {...messages.UnknownMapNameType} />
                    </span>
                  }
                />
              )}

              {types.map(val => (
                <Dropdown.Item
                  onClick={this.changeValue}
                  selected={val.get('value') === value}
                  key={val.get('value')}
                  value={val.get('value')}
                  text={
                    <span>
                      {val.get('value')}: {val.get('title')}
                    </span>
                  }
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        }
      />
    );
  }
}

ProjectStoreInteractingMapNameType.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  types: PropTypes.instanceOf(List).isRequired,
};

ProjectStoreInteractingMapNameType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
};

export default ProjectStoreInteractingMapNameType;

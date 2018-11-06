/**
 *
 * ProjectInteractingMapNameType
 *
 */

import { FormattedMessage } from 'react-intl';
import { Input, Dropdown } from 'semantic-ui-react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectInteractingMapNameType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue } = this.props;
      onChangeValue(owns.value);
    };
  }

  render() {
    const { value, size, className, fluid, disabled, types } = this.props;

    const type = types.find(val => val.get('value') === value);
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
        disabled={disabled}
        value={value}
        onChange={this.changeValue}
        className={className}
        label={
          !disabled && (
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
          )
        }
      />
    );
  }
}

ProjectInteractingMapNameType.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  disabled: PropTypes.bool,
  types: PropTypes.instanceOf(List).isRequired,
  value: PropTypes.string,
};

ProjectInteractingMapNameType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
  disabled: false,
  value: null,
};

export default ProjectInteractingMapNameType;

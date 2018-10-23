/**
 *
 * ProjectItemInteractingWPType
 *
 */

import { Dropdown as DropdownUI } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { getWP, getWPType } from 'containers/App/getters/projectItem';
import { Map, List } from 'immutable';
import { parseInt, isNumber } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingWPType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(owns.value) || 0);
    };
  }

  render() {
    const { item, itemNextValues, types, className } = this.props;

    const value = getWP(itemNextValues.get('nextValue'), { entry: item });
    const type = getWPType(itemNextValues.get('nextValue'), {
      entry: item,
      weaponTypes: types,
    });

    const isUnknown = !type;

    return (
      <Dropdown
        text={
          isUnknown ? (
            <span>
              {isNumber(value) && `${value}: `}
              <FormattedMessage {...messages.UnknownWeaponType} />
            </span>
          ) : (
            `${type.get('value')}: ${type.get('title')}`
          )
        }
        inline
        labeled
        scrolling
        item
        icon="bolt"
        className={className}
      >
        <Dropdown.Menu>
          {isUnknown && (
            <Dropdown.Item
              selected
              text={
                <span>
                  {isNumber(value) && `${value}: `}
                  <FormattedMessage {...messages.UnknownWeaponType} />
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
    );
  }
}

ProjectItemInteractingWPType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string,
};

ProjectItemInteractingWPType.defaultProps = {
  className: '',
};

export default ProjectItemInteractingWPType;

const Dropdown = styled(DropdownUI)`
  &.ui.dropdown {
    padding: 0 7px;
    line-height: 14px;
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 3px;

    &:hover {
      color: #000;
    }
  }
`;

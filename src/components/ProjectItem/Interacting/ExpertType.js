/**
 *
 * ProjectItemInteractingExpertType
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt, isNumber } from 'lodash';
import { Map, List } from 'immutable';
import { Input, Dropdown } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import * as projectItem from '../../../containers/App/getters/projectItem';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingExpertType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item, n } = this.props;
      onChangeValue(item, { value: parseInt(owns.value) || 0, n });
    };
  }

  render() {
    const {
      item,
      itemNextValues,
      size,
      className,
      fluid,
      n,
      types,
    } = this.props;

    const value = projectItem.getExpertTypeValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const type = projectItem.getExpertType(
      itemNextValues.get('nextValue'),
      { entry: item, expertTypes: types },
      { n },
    );

    const isUnknown = !type;
    const isDisabled = value === -1;
    const isDisabledFree = !types.some(
      expertType => expertType.get('value') === -1,
    );
    const isViewUnknownItem = isUnknown && !isDisabled;

    const dropdownText = (() => {
      if (isDisabled && isDisabledFree) {
        return (
          <span>
            -1:&nbsp;
            <FormattedMessage {...messages.Disabled} />
          </span>
        );
      }
      if (isUnknown) {
        return (
          <span>
            {isNumber(value) && `${value}: `}
            <FormattedMessage {...messages.UnknownExpertType} />
          </span>
        );
      }

      return `${type.get('value')}: ${type.get('title')}`;
    })();

    return (
      <Input
        size={size}
        fluid={fluid}
        type="number"
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
              {isViewUnknownItem && (
                <Dropdown.Item
                  selected
                  text={
                    <span>
                      {isNumber(value) && `${value}: `}
                      <FormattedMessage {...messages.UnknownExpertType} />
                    </span>
                  }
                />
              )}

              {isDisabledFree && (
                <Dropdown.Item
                  onClick={this.changeValue}
                  selected={isDisabled}
                  value={-1}
                  text={
                    <span>
                      -1:&nbsp;
                      <FormattedMessage {...messages.Disabled} />
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

ProjectItemInteractingExpertType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  n: PropTypes.oneOf([1, 2]).isRequired,
  types: PropTypes.instanceOf(List).isRequired,
};

ProjectItemInteractingExpertType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
};

export default ProjectItemInteractingExpertType;

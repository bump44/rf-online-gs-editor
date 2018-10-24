/**
 *
 * ProjectItemTypeSelect
 *
 */

import { Dropdown } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';

import * as itemTypes from '../../../structs/item_types';
import messages from './messages';
import ProjectItemTypeLocaleMessage from '../ItemTypeLocaleMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemTypeSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderWithMessage = this.renderWithMessage.bind(this);

    this.onChangeValue = (evt, owns) => {
      const { onChangeValue, onChange } = this.props;

      if (onChangeValue) {
        onChangeValue(owns.value);
      } else {
        onChange(evt, owns);
      }
    };
  }

  renderWithMessage(message) {
    const { value, addOptionAll } = this.props;

    return (
      <Dropdown inline labeled scrolling item floating text={message}>
        <Dropdown.Menu>
          {addOptionAll && (
            <Dropdown.Item
              value=""
              onClick={this.onChangeValue}
              selected={!value}
              text={<FormattedMessage {...messages.All} />}
            />
          )}

          {map(itemTypes, (type, key) => (
            <Dropdown.Item
              value={type}
              key={key}
              onClick={this.onChangeValue}
              selected={type === value}
              text={
                <ProjectItemTypeLocaleMessage messageKey={type} upperFirst />
              }
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    const { value, addOptionAll } = this.props;

    const MessageComponent = !value
      ? FormattedMessage
      : ProjectItemTypeLocaleMessage;

    // eslint-disable-next-line
    const MessageComponentProps = !value
      ? addOptionAll
        ? messages.AllItemTypes
        : messages.WrongItemType
      : { messageKey: value, upperFirst: true };

    return (
      <MessageComponent {...MessageComponentProps}>
        {this.renderWithMessage}
      </MessageComponent>
    );
  }
}

ProjectItemTypeSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
  addOptionAll: PropTypes.bool,
};

ProjectItemTypeSelect.defaultProps = {
  onChange: undefined,
  onChangeValue: undefined,
  value: '',
  addOptionAll: true,
};

export default ProjectItemTypeSelect;

/**
 *
 * ProjectItemTypeSelect
 *
 */

import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';
import * as itemTypes from '../../structs/item_types';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemTypeSelect extends React.PureComponent {
  render() {
    const { onChange, value } = this.props;

    const MessageComponent = !value
      ? FormattedMessage
      : ProjectItemTypeLocaleMessage;

    const MessageComponentProps = !value
      ? messages.AllItemTypes
      : { messageKey: value, upperFirst: true };

    return (
      <MessageComponent {...MessageComponentProps}>
        {message => (
          <Dropdown scrolling text={message}>
            <Dropdown.Menu>
              <Dropdown.Item
                value=""
                onClick={onChange}
                selected={!value}
                text={<FormattedMessage {...messages.All} />}
              />
              {map(itemTypes, (type, key) => (
                <Dropdown.Item
                  value={type}
                  key={key}
                  onClick={onChange}
                  selected={type === value}
                  text={
                    <ProjectItemTypeLocaleMessage
                      messageKey={type}
                      upperFirst
                    />
                  }
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </MessageComponent>
    );
  }
}

ProjectItemTypeSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ProjectItemTypeSelect.defaultProps = {
  onChange: undefined,
  value: '',
};

export default ProjectItemTypeSelect;

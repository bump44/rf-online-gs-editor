/**
 *
 * ProjectItemInteractingName
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map /* , List */ } from 'immutable';
import { Input } from 'semantic-ui-react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingName extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, evt.target.value);
    };
  }

  render() {
    const { item, itemNextValues, size, className } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'clientNd',
      'strName',
    ]);

    const currValue = item.getIn(
      [
        ['priorStrName'],
        ['clientNd', 'strName'],
        ['client', 'strName'],
        ['serverStr', 'strNameEN'],
        ['serverStr', 'strNameGLOBAL'],
        ['server', 'strName'],
      ].find(fieldSets => item.getIn(fieldSets) !== undefined) ||
        'priorStrName',
      '',
    );

    const strName = nextValue !== undefined ? nextValue : currValue;

    return (
      <Input
        size={size}
        fluid
        type="text"
        value={strName}
        onChange={this.changeValue}
        className={className}
      />
    );
  }
}

ProjectItemInteractingName.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingName.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingName;

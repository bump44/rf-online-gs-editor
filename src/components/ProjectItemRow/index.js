/**
 *
 * ProjectItemRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRow extends React.PureComponent {
  render() {
    const { item } = this.props;

    return (
      <div className="columns">
        <div className="column">
          <span className="tag">{item.get('nIndex')}</span>
        </div>
        <div className="column">{item.getIn(['client', 'strName'])}</div>
        <div className="column">
          <FormattedMessage {...messages.header} />
        </div>
      </div>
    );
  }
}

ProjectItemRow.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  items: PropTypes.instanceOf(List).isRequired,
};

export default ProjectItemRow;

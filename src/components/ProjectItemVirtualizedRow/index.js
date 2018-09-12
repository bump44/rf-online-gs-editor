/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import styled from 'styled-components';

import ProjectItemRow from '../ProjectItemRow';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemVirtualizedRow extends React.PureComponent {
  render() {
    const { index, style, items } = this.props;
    const item = items.get(index);

    return (
      <div style={style}>
        <Row>
          {item && <ProjectItemRow items={items} item={item} />}
          {!item && (
            <span className="tag is-warning">
              <i className="fas fa-spin fa-spinner" />
            </span>
          )}
        </Row>
      </div>
    );
  }
}

ProjectItemVirtualizedRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
};

export default ProjectItemVirtualizedRow;

const Row = styled.div`
  padding: 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

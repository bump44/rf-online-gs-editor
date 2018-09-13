/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import styled from 'styled-components';

import ProjectItemRow from '../ProjectItemRow';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemVirtualizedRow extends React.PureComponent {
  render() {
    const { index, style, items, actions, nextValues } = this.props;
    const item = items.get(index);

    return (
      <div style={style}>
        <Row>
          {item && (
            <ProjectItemRow
              nextValues={nextValues}
              actions={actions}
              items={items}
              item={item}
              itemNextValues={nextValues.get(item.get('id'), Map({}))}
            />
          )}
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
  nextValues: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectItemVirtualizedRow;

const Row = styled.div`
  padding: 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

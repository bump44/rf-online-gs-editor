/**
 *
 * ProjectItemVirtualizedRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
// import styled from 'styled-components';

import Row from '../ProjectItemRow/styles';
import ProjectItemRow from '../ProjectItemRow';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemVirtualizedRow extends React.PureComponent {
  render() {
    const {
      index,
      style,
      items,
      actions,
      nextValues,
      moneyTypes,
      itemGrades,
      localSettings,
    } = this.props;

    const item = items.get(index);

    return (
      <div style={style}>
        {item && (
          <ProjectItemRow
            nextValues={nextValues}
            actions={actions}
            items={items}
            item={item}
            itemNextValues={nextValues.get(item.get('id'), Map({}))}
            moneyTypes={moneyTypes}
            itemGrades={itemGrades}
            localSettings={localSettings}
          />
        )}
        {!item && (
          <Row>
            <span className="tag is-warning">
              <i className="fas fa-spin fa-spinner" />
            </span>
          </Row>
        )}
      </div>
    );
  }
}

ProjectItemVirtualizedRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectItemVirtualizedRow;

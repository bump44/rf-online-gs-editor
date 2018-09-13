/**
 *
 * ProjectItemRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderTagIndexWithNextState = this.renderTagIndexWithNextState.bind(
      this,
    );
  }

  renderTagIndexWithNextState() {
    const { item, itemNextValues } = this.props;
    const isSaved = itemNextValues.getIn(['isSaved'], true);
    const isSaving = itemNextValues.getIn(['isSaving'], false);
    const isError = itemNextValues.getIn(['isError'], false);
    const errorMessage = itemNextValues.getIn(['errorMessage'], '');
    const nIndex = itemNextValues.getIn(
      ['nextValue', 'nIndex'],
      item.get('nIndex'),
    );

    const isShowStatus =
      (!isSaving && !isSaved && !isError) || isSaving || isError;

    return (
      <span
        title={isError ? errorMessage : undefined}
        className={cx('tag', {
          'is-danger': isError,
          'is-success':
            itemNextValues.getIn(['isSaved']) !== undefined && isSaved,
          'is-warning': isSaving,
        })}
      >
        {isShowStatus && (
          <small>
            <i
              className={cx('fas', {
                'fa-pencil-alt': !isSaving && !isSaved && !isError,
                'fa-spin fa-spinner': isSaving,
                'fa-times': isError,
              })}
            />
            &nbsp;
          </small>
        )}
        {nIndex}
      </span>
    );
  }

  render() {
    const { item, itemNextValues, actions } = this.props;

    const strName =
      itemNextValues.getIn(['nextValue', 'clientNd', 'strName']) ||
      item.getIn(
        [
          ['priorStrName'],
          ['clientNd', 'strName'],
          ['serverStr', 'strNameEN'],
          ['serverStr', 'strNameGLOBAL'],
          ['client', 'strName'],
          ['server', 'strName'],
        ].find(fieldSets => !!item.getIn(fieldSets)) || 'priorStrName',
        '',
      );

    return (
      <div className="columns">
        <div className="column">{this.renderTagIndexWithNextState()}</div>
        <div className="column">
          <input
            type="text"
            value={strName}
            onChange={evt => actions.changeName(item, evt.target.value)}
          />
        </div>
        <div className="column">
          <FormattedMessage {...messages.header} />
        </div>
      </div>
    );
  }
}

ProjectItemRow.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectItemRow;

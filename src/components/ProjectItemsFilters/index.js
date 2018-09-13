/**
 *
 * ProjectItemsFilters
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemsFilters extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeBy = evt => {
      const { onChangeSortBy } = this.props;
      onChangeSortBy(evt.target.value);
    };

    this.toggleWay = () => {
      const { sortWay, onChangeSortWay } = this.props;
      onChangeSortWay(sortWay === 1 ? -1 : 1);
    };
  }

  render() {
    const { sortBy, sortWay } = this.props;

    return (
      <div className="field">
        <div className="control">
          <div className="select is-info is-small">
            <select value={sortBy} onChange={this.changeBy}>
              <FormattedMessage {...messages.ByIndex}>
                {message => <option value="nIndex">{message}</option>}
              </FormattedMessage>
              <FormattedMessage {...messages.ByCreatedAt}>
                {message => <option value="createdAt">{message}</option>}
              </FormattedMessage>
              <FormattedMessage {...messages.ByUpdatedAt}>
                {message => <option value="updatedAt">{message}</option>}
              </FormattedMessage>
              <FormattedMessage {...messages.ByTitle}>
                {message => <option value="priorStrName">{message}</option>}
              </FormattedMessage>
            </select>
          </div>
          &nbsp;
          <button
            type="button"
            onClick={this.toggleWay}
            className="button is-small"
          >
            {sortWay === 1 ? (
              <FormattedMessage {...messages.Asc} />
            ) : (
              <FormattedMessage {...messages.Desc} />
            )}
          </button>
        </div>
      </div>
    );
  }
}

ProjectItemsFilters.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortWay: PropTypes.number.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  onChangeSortWay: PropTypes.func.isRequired,
};

export default ProjectItemsFilters;

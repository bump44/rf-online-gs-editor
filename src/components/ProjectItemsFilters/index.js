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

    this.changeSortBy = evt => {
      const { onChangeSortBy } = this.props;
      onChangeSortBy(evt.target.value);
    };

    this.toggleSortWay = () => {
      const { sortWay, onChangeSortWay } = this.props;
      onChangeSortWay(sortWay === 1 ? -1 : 1);
    };

    this.changeWhereSearch = evt => {
      const { onChangeWhereSearch } = this.props;
      onChangeWhereSearch(evt.target.value);
    };
  }

  render() {
    const { sortBy, sortWay, whereSearch } = this.props;

    return (
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="select is-info is-small">
            <select value={sortBy} onChange={this.changeSortBy}>
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
        </div>

        <div className="control">
          <button
            type="button"
            onClick={this.toggleSortWay}
            className="button is-small"
          >
            {sortWay === 1 ? (
              <FormattedMessage {...messages.Asc} />
            ) : (
              <FormattedMessage {...messages.Desc} />
            )}
          </button>
        </div>

        <div className="control">
          <FormattedMessage {...messages.SearchString}>
            {message => (
              <input
                className="input is-small"
                type="text"
                placeholder={message}
                onChange={this.changeWhereSearch}
                value={whereSearch}
              />
            )}
          </FormattedMessage>
        </div>
      </div>
    );
  }
}

ProjectItemsFilters.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortWay: PropTypes.number.isRequired,
  whereSearch: PropTypes.string.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  onChangeSortWay: PropTypes.func.isRequired,
  onChangeWhereSearch: PropTypes.func.isRequired,
};

export default ProjectItemsFilters;

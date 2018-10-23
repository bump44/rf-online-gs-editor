/**
 *
 * ProjectStoresFilters
 *
 */

import { Dropdown, Button, Input, Grid, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoresFilters extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeSortBy = (evt, sel) => {
      const { onChangeSortBy } = this.props;
      onChangeSortBy(sel.value);
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
      <Grid verticalAlign="middle" columns={4}>
        <Grid.Column largeScreen={3} widescreen={2}>
          <Dropdown
            scrolling
            inline
            floating
            onChange={this.changeSortBy}
            value={sortBy}
            options={sortByOptions}
          />
        </Grid.Column>
        <Grid.Column largeScreen={3} widescreen={1}>
          <Button onClick={this.toggleSortWay} size="mini">
            <Icon name={sortWay === 1 ? 'caret up' : 'caret down'} />
            {sortWay === 1 ? (
              <FormattedMessage {...messages.Asc} />
            ) : (
              <FormattedMessage {...messages.Desc} />
            )}
          </Button>
        </Grid.Column>
        <Grid.Column largeScreen={10} widescreen={13}>
          <FormattedMessage {...messages.SearchString}>
            {message => (
              <Input
                value={whereSearch}
                onChange={this.changeWhereSearch}
                icon="search"
                placeholder={message}
                size="mini"
                fluid
              />
            )}
          </FormattedMessage>
        </Grid.Column>
      </Grid>
    );
  }
}

ProjectStoresFilters.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortWay: PropTypes.number.isRequired,
  whereSearch: PropTypes.string.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  onChangeSortWay: PropTypes.func.isRequired,
  onChangeWhereSearch: PropTypes.func.isRequired,
};

export default ProjectStoresFilters;

const sortByOptions = [
  {
    key: 'nIndex',
    value: 'nIndex',
    text: <FormattedMessage {...messages.ByIndex} />,
  },
  {
    key: 'createdAt',
    value: 'createdAt',
    text: <FormattedMessage {...messages.ByCreatedAt} />,
  },
  {
    key: 'updatedAt',
    value: 'updatedAt',
    text: <FormattedMessage {...messages.ByUpdatedAt} />,
  },
  {
    key: 'priorStrName',
    value: 'priorStrName',
    text: <FormattedMessage {...messages.ByTitle} />,
  },
];

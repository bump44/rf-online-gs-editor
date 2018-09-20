/**
 *
 * ProjectItemRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Map, List } from 'immutable';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Row from './styles';
import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';
import { AUTO_REVERSE_CLIENT_CODES } from '../../containers/App/constants';
import renderResolvers from './renderResolvers';

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
      <Link
        to={`/project/${item.getIn(['project', 'id'])}/items/${item.get('id')}`}
        title={isError ? errorMessage : undefined}
        className={cx('tag', {
          'is-danger': isError,
          'is-success':
            itemNextValues.getIn(['isSaved']) !== undefined && isSaved,
          'is-warning': isSaving,
        })}
      >
        <small>
          <i
            className={cx('fas', {
              'fa-check': !isShowStatus,
              'fa-pencil-alt':
                isShowStatus && !isSaving && !isSaved && !isError,
              'fa-spin fa-spinner': isShowStatus && isSaving,
              'fa-times': isShowStatus && isError,
            })}
          />
          &nbsp;
        </small>
        {nIndex}
        &nbsp;
        <ProjectItemTypeLocaleMessage
          messageKey={item.get('type')}
          tagName="small"
        />
      </Link>
    );
  }

  render() {
    const {
      items,
      item,
      itemNextValues,
      actions,
      moneyTypes,
      itemGrades,
      weaponTypes,
      localSettings,
    } = this.props;

    const autoReverseClientCodes = localSettings.get(AUTO_REVERSE_CLIENT_CODES);
    const Render = renderResolvers[item.get('type')];
    const serverStrCode = item.getIn(['server', 'strCode']) || '';
    const clientStrCode = item.getIn(['client', 'strCode']) || '';

    /* eslint-disable indent */
    const clientStrCodeReversed = autoReverseClientCodes
      ? clientStrCode
          .split(/(.{2})/g)
          .reverse()
          .join('')
      : clientStrCode;
    /* eslint-enable indent */

    const isShowStrCode = !!(serverStrCode || clientStrCodeReversed);

    return (
      <Row>
        <div className="columns">
          <div className="column is-narrow">
            {this.renderTagIndexWithNextState()}
            {isShowStrCode && (
              <div
                className="mt-5"
                title={
                  serverStrCode && clientStrCodeReversed
                    ? clientStrCodeReversed
                    : undefined
                }
              >
                <code>{serverStrCode || clientStrCodeReversed}</code>
              </div>
            )}
          </div>
          <div className="column">
            {Render && (
              <Render
                item={item}
                itemNextValues={itemNextValues}
                items={items}
                actions={actions}
                moneyTypes={moneyTypes}
                itemGrades={itemGrades}
                weaponTypes={weaponTypes}
              />
            )}
            {!Render && <FormattedMessage {...messages.RenderNotDefined} />}
          </div>
        </div>
      </Row>
    );
  }
}

ProjectItemRow.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  items: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectItemRow;

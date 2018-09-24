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
import { Grid, Label, Icon } from 'semantic-ui-react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Row from './styles';
import Code from '../Code';
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
      <Label
        title={isError ? errorMessage : undefined}
        as={Link}
        to={`/project/${item.getIn(['project', 'id'])}/items/${item.get('id')}`}
        color={cx({
          red: isError,
          green: itemNextValues.getIn(['isSaved']) !== undefined && isSaved,
          yellow: isSaving,
        })}
        image
      >
        <Icon
          loading={isShowStatus && isSaving}
          name={cx({
            check: !isShowStatus,
            'pencil alt': isShowStatus && !isSaving && !isSaved && !isError,
            times: isShowStatus && isError,
            spinner: isShowStatus && isSaving,
          })}
        />
        {nIndex}
        <Label.Detail>
          <ProjectItemTypeLocaleMessage
            messageKey={item.get('type')}
            tagName="small"
          />
        </Label.Detail>
      </Label>
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
        <Grid columns={2}>
          <Grid.Column largeScreen={2} widescreen={2}>
            {this.renderTagIndexWithNextState()}
            {isShowStrCode && (
              <div className="mt-5">
                <Code
                  title={
                    serverStrCode && clientStrCodeReversed
                      ? clientStrCodeReversed
                      : undefined
                  }
                >
                  {serverStrCode || clientStrCodeReversed}
                </Code>
              </div>
            )}
          </Grid.Column>
          <Grid.Column largeScreen={14} widescreen={14}>
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
          </Grid.Column>
        </Grid>
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

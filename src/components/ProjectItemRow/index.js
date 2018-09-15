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

import Row from './styles';
import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';
import { FACE, UPPER } from '../../structs/item_types';

import RenderFace from './Render/Face';
import RenderArmor from './Render/Armor';

const TypeToRowRender = {
  [FACE]: RenderFace,
  [UPPER]: RenderArmor,
};

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
      </span>
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
    } = this.props;

    const Render = TypeToRowRender[item.get('type')];

    return (
      <Row>
        <div className="columns">
          <div className="column is-narrow">
            {this.renderTagIndexWithNextState()}
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
  items: PropTypes.instanceOf(List).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.object.isRequired,
};

export default ProjectItemRow;

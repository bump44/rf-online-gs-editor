/**
 *
 * ProjectItemLabelDetail
 *
 */

import { Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIndex,
  getId,
  getProjectId,
  getType,
} from '~/containers/App/getters/projectItem';

import ProjectItemTypeLocaleMessage from '../ItemTypeLocaleMessage';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemLabelDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(evt) {
    evt.preventDefault();
    const { onClick, item, itemNextValues } = this.props;
    onClick(item, itemNextValues);
  }

  render() {
    const { item, itemNextValues, link, size, onClick } = this.props;

    const nextValue = itemNextValues.get('nextValue');

    const isSaved = itemNextValues.getIn(['isSaved'], true);
    const isSaving = itemNextValues.getIn(['isSaving'], false);
    const isError = itemNextValues.getIn(['isError'], false);
    const errorMessage = itemNextValues.getIn(['errorMessage'], '');
    const nIndex = getIndex(nextValue, { entry: item });

    const isShowStatus =
      (!isSaving && !isSaved && !isError) || isSaving || isError;

    const componentProps = {
      title: isError ? errorMessage : undefined,
      color: cx({
        teal:
          !isError &&
          !(itemNextValues.getIn(['isSaved']) !== undefined && isSaved) &&
          !isSaving &&
          !(isShowStatus && !isSaving && !isSaved && !isError),
        red: isError,
        green: itemNextValues.getIn(['isSaved']) !== undefined && isSaved,
        yellow: isSaving,
        pink: isShowStatus && !isSaving && !isSaved && !isError,
      }),
      image: true,
    };

    if (link || onClick) {
      const id = getId(nextValue, { entry: item });
      const projectId = getProjectId(nextValue, { entry: item });

      componentProps.as = Link;
      componentProps.to = `/project/${projectId}/items/${id}`;
    }

    if (onClick) {
      componentProps.onClick = this.onClick;
    }

    const type = getType(nextValue, { entry: item });

    return (
      <Label {...componentProps} size={size}>
        <Icon
          loading={isShowStatus && isSaving}
          name={cx({
            check: !isShowStatus,
            pencil: isShowStatus && !isSaving && !isSaved && !isError,
            times: isShowStatus && isError,
            spinner: isShowStatus && isSaving,
          })}
        />
        {nIndex}
        <Label.Detail>
          <ProjectItemTypeLocaleMessage messageKey={type} tagName="small" />
        </Label.Detail>
      </Label>
    );
  }
}

ProjectItemLabelDetail.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  link: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
  onClick: PropTypes.func,
};

ProjectItemLabelDetail.defaultProps = {
  link: false,
  size: 'small',
  onClick: undefined,
};

export default ProjectItemLabelDetail;

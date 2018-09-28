/**
 *
 * ProjectItemLabelDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import { Label, Icon } from 'semantic-ui-react';
import ProjectItemTypeLocaleMessage from '../ProjectItemTypeLocaleMessage';

import {
  getIndex,
  getId,
  getProjectId,
  getType,
} from '../../containers/App/getters/projectItem';

function ProjectItemLabelDetail(props) {
  const { item, itemNextValues, link, size } = props;

  const nextValue = itemNextValues.get('nextValue');

  const isSaved = itemNextValues.getIn(['isSaved'], true);
  const isSaving = itemNextValues.getIn(['isSaving'], false);
  const isError = itemNextValues.getIn(['isError'], false);
  const errorMessage = itemNextValues.getIn(['errorMessage'], '');
  const nIndex = getIndex(nextValue, { item });

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

  if (link) {
    const id = getId(nextValue, { item });
    const projectId = getProjectId(nextValue, { item });

    componentProps.as = Link;
    componentProps.to = `/project/${projectId}/items/${id}`;
  }

  const type = getType(nextValue, { item });

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

ProjectItemLabelDetail.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  link: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
};

ProjectItemLabelDetail.defaultProps = {
  link: false,
  size: 'small',
};

export default ProjectItemLabelDetail;

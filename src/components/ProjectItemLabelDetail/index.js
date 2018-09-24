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
// import styled from 'styled-components';

function ProjectItemLabelDetail(props) {
  const { item, itemNextValues, link } = props;
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
    componentProps.as = Link;
    componentProps.to = `/project/${item.getIn([
      'project',
      'id',
    ])}/items/${item.get('id')}`;
  }

  return (
    <Label {...componentProps}>
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
        <ProjectItemTypeLocaleMessage
          messageKey={item.get('type')}
          tagName="small"
        />
      </Label.Detail>
    </Label>
  );
}

ProjectItemLabelDetail.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  link: PropTypes.bool,
};

ProjectItemLabelDetail.defaultProps = {
  link: false,
};

export default ProjectItemLabelDetail;

/**
 *
 * ProjectStoreLabelDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import { Label, Icon } from 'semantic-ui-react';

import {
  getIndex,
  getProjectId,
  getId,
} from '../../containers/App/getters/projectStore';

function ProjectStoreLabelDetail(props) {
  const { store, storeNextValues, link } = props;

  const nextValue = storeNextValues.get('nextValue');
  const isSaved = storeNextValues.getIn(['isSaved'], true);
  const isSaving = storeNextValues.getIn(['isSaving'], false);
  const isError = storeNextValues.getIn(['isError'], false);
  const errorMessage = storeNextValues.getIn(['errorMessage'], '');

  const nIndex = getIndex(nextValue, { entry: store });

  const isShowStatus =
    (!isSaving && !isSaved && !isError) || isSaving || isError;

  const componentProps = {
    title: isError ? errorMessage : undefined,
    color: cx({
      teal:
        !isError &&
        !(storeNextValues.getIn(['isSaved']) !== undefined && isSaved) &&
        !isSaving &&
        !(isShowStatus && !isSaving && !isSaved && !isError),
      red: isError,
      green: storeNextValues.getIn(['isSaved']) !== undefined && isSaved,
      yellow: isSaving,
      pink: isShowStatus && !isSaving && !isSaved && !isError,
    }),
    image: true,
  };

  if (link) {
    const id = getId(nextValue, { entry: store });
    const projectId = getProjectId(nextValue, { entry: store });

    componentProps.as = Link;
    componentProps.to = `/project/${projectId}/stores/${id}`;
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
    </Label>
  );
}

ProjectStoreLabelDetail.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  link: PropTypes.bool,
};

ProjectStoreLabelDetail.defaultProps = {
  link: false,
};

export default ProjectStoreLabelDetail;

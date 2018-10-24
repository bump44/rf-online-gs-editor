/**
 *
 * ProjectItemLabelDetail
 *
 */

import { Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getStatusColor,
  getIconName,
} from '~/containers/App/getters/nextValues';

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

    const isSaving = itemNextValues.getIn(['isSaving'], false);
    const isError = itemNextValues.getIn(['isError'], false);
    const errorMessage = itemNextValues.getIn(['errorMessage'], '');
    const nIndex = getIndex(nextValue, { entry: item });

    const componentProps = {
      title: isError ? errorMessage : undefined,
      color: getStatusColor(itemNextValues),
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
        <Icon loading={isSaving} name={getIconName(itemNextValues)} />
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

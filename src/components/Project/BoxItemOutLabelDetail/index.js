/**
 *
 * ProjectBoxItemOutLabelDetail
 *
 */

import { getIndex } from 'containers/App/getters/projectBoxItemOut';
import { Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutLabelDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(evt) {
    evt.preventDefault();
    const { onClick, boxItemOut, boxItemOutNextValues } = this.props;
    onClick(boxItemOut, boxItemOutNextValues);
  }

  render() {
    const { boxItemOut, boxItemOutNextValues, size, onClick } = this.props;

    const nextValue = boxItemOutNextValues.get('nextValue');

    const isSaved = boxItemOutNextValues.getIn(['isSaved'], true);
    const isSaving = boxItemOutNextValues.getIn(['isSaving'], false);
    const isError = boxItemOutNextValues.getIn(['isError'], false);
    const errorMessage = boxItemOutNextValues.getIn(['errorMessage'], '');
    const nIndex = getIndex(nextValue, { entry: boxItemOut });

    const isShowStatus =
      (!isSaving && !isSaved && !isError) || isSaving || isError;

    const componentProps = {
      title: isError ? errorMessage : undefined,
      color: cx({
        teal:
          !isError &&
          !(boxItemOutNextValues.getIn(['isSaved']) !== undefined && isSaved) &&
          !isSaving &&
          !(isShowStatus && !isSaving && !isSaved && !isError),
        red: isError,
        green: boxItemOutNextValues.getIn(['isSaved']) !== undefined && isSaved,
        yellow: isSaving,
        pink: isShowStatus && !isSaving && !isSaved && !isError,
      }),
      image: true,
    };

    if (onClick) {
      componentProps.as = Link;
      componentProps.to = `/`; // required
      componentProps.onClick = this.onClick;
    }

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
      </Label>
    );
  }
}

ProjectBoxItemOutLabelDetail.propTypes = {
  boxItemOut: PropTypes.instanceOf(Map).isRequired,
  boxItemOutNextValues: PropTypes.instanceOf(Map).isRequired,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
  onClick: PropTypes.func,
};

ProjectBoxItemOutLabelDetail.defaultProps = {
  size: 'small',
  onClick: undefined,
};

export default ProjectBoxItemOutLabelDetail;

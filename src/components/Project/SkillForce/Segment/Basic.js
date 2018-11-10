/**
 *
 * ProjectSkillForceSegmentBasic
 *
 */

// import { Map } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForceSegmentBasic extends React.PureComponent {
  render() {
    const { style } = this.props;

    return <Segment color="yellow" style={style} />;
  }
}

ProjectSkillForceSegmentBasic.propTypes = {
  // skillForce: PropTypes.instanceOf(Map).isRequired,
  // skillForceNextValues: PropTypes.instanceOf(Map).isRequired,
  // skillForceActions: PropTypes.object.isRequired,
  style: PropTypes.object,
};

ProjectSkillForceSegmentBasic.defaultProps = {
  style: {},
};

export default ProjectSkillForceSegmentBasic;

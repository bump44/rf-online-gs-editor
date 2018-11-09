/**
 *
 * ProjectPotionItemEffectSegmentBasic
 *
 */

// import { Map } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

/* eslint-disable react/prefer-stateless-function */
class ProjectPotionItemEffectSegmentBasic extends React.PureComponent {
  render() {
    const { style } = this.props;

    return <Segment color="yellow" style={style} />;
  }
}

ProjectPotionItemEffectSegmentBasic.propTypes = {
  // potionItemEffect: PropTypes.instanceOf(Map).isRequired,
  // potionItemEffectNextValues: PropTypes.instanceOf(Map).isRequired,
  // potionItemEffectActions: PropTypes.object.isRequired,
  style: PropTypes.object,
};

ProjectPotionItemEffectSegmentBasic.defaultProps = {
  style: {},
};

export default ProjectPotionItemEffectSegmentBasic;

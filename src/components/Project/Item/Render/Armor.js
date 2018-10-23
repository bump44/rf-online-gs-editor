/**
 *
 * ProjectItemRenderArmor
 *
 */

import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import SegmentActions from '../Segment/Actions';
import SegmentBasicArmor from '../Segment/BasicArmor';
import SegmentBuilder from './SegmentBuilder';
import SegmentEffects from '../Segment/Effects';
import SegmentExperts from '../Segment/Experts';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderArmor extends SegmentBuilder {
  componentWillMount() {
    this.addTabPane('basics', 'Basic', SegmentBasicArmor)
      .addTabPane('experts', 'Experts', SegmentExperts)
      .addTabPane('effects', 'Effects', SegmentEffects)
      .addTabPane('actions', 'Actions', SegmentActions);
  }
}

ProjectItemRenderArmor.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  expertTypes: PropTypes.instanceOf(List).isRequired,
  effectTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectItemRenderArmor;

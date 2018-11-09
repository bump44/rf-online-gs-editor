/**
 *
 * ProjectItemRenderPotion
 *
 */

import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import SegmentActions from '../Segment/Actions';
import SegmentBasic from '../Segment/Basic';
import SegmentPotionEffects from '../Segment/PotionEffects';
import SegmentBuilder from './SegmentBuilder';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderPotion extends SegmentBuilder {
  componentWillMount() {
    this.addTabPane('basics', 'Basic', SegmentBasic)
      .addTabPane('actions', 'Actions', SegmentActions)
      .addTabPane('potionEffects', 'Potion Effects', SegmentPotionEffects);
  }
}

ProjectItemRenderPotion.propTypes = {
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

export default ProjectItemRenderPotion;

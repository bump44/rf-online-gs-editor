/**
 *
 * ProjectItemRenderFace
 *
 */

import { Map, List } from 'immutable';
import { Segment, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import SegmentActions from '../Segment/Actions';
import SegmentBasic from '../Segment/Basic';
import SegmentBuilder from './SegmentBuilder';

import ProjectItemInteractingKindClt from '../Interacting/KindClt';
import ProjectItemInteractingFixPart from '../Interacting/FixPart';
import ProjectItemInteractingDefEffType from '../Interacting/DefEffType';

const RenderBasic = ({ item, itemNextValues, itemActions, ...props }) => (
  <React.Fragment>
    <SegmentBasic
      item={item}
      itemNextValues={itemNextValues}
      itemActions={itemActions}
      {...props}
    />
    <Segment color="black">
      <Grid columns="3">
        <Grid.Column>
          <ProjectItemInteractingKindClt
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeKindClt}
          />
        </Grid.Column>
        <Grid.Column>
          <ProjectItemInteractingFixPart
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeFixPart}
          />
        </Grid.Column>
        <Grid.Column>
          <ProjectItemInteractingDefEffType
            item={item}
            itemNextValues={itemNextValues}
            onChangeValue={itemActions.changeDefEffType}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  </React.Fragment>
);

/* eslint-disable react/prefer-stateless-function */
class ProjectItemRenderFace extends SegmentBuilder {
  componentWillMount() {
    this.addTabPane('basics', 'Basic', RenderBasic).addTabPane(
      'actions',
      'Actions',
      SegmentActions,
    );
  }
}

ProjectItemRenderFace.propTypes = {
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

export default ProjectItemRenderFace;

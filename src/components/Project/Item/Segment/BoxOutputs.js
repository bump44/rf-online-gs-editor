/**
 *
 * ProjectItemSegmentBoxOutputs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Segment } from 'semantic-ui-react';
import { IMMUTABLE_MAP } from '../../../containers/App/constants';
import * as projectItem from '../../../containers/App/getters/projectItem';
import * as projectBoxItemOut from '../../../containers/App/getters/projectBoxItemOut';

import ProjectBoxItemOutLabelDetail from '../../ProjectBoxItemOutLabelDetail';
import ProjectBoxItemOutInteractingOutputsProbDetail from '../../ProjectBoxItemOut/Interacting/OutputsProbDetail';
import ProjectBoxItemOutInteractingOutputs from '../../ProjectBoxItemOut/Interacting/Outputs';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentBoxOutputs extends React.PureComponent {
  render() {
    const {
      item,
      itemNextValues,
      nextValues,
      boxItemOutActions,
      entriesFinderItemsActions,
      entriesFinderItems,
      itemActions,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      localSettings,
    } = this.props;

    const boxItemOut = projectItem.getBoxItemOut(
      itemNextValues.get('nextValue'),
      { entry: item },
    );

    if (!boxItemOut) {
      return <div>Outputs not defined</div>;
    }

    const boxItemOutNextValues = nextValues.get(
      projectBoxItemOut.getId(undefined, { entry: boxItemOut }),
      IMMUTABLE_MAP,
    );

    return (
      <Segment>
        <ProjectBoxItemOutLabelDetail
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
        />

        <ProjectBoxItemOutInteractingOutputsProbDetail
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
        />

        <ProjectBoxItemOutInteractingOutputs
          boxItemOut={boxItemOut}
          boxItemOutNextValues={boxItemOutNextValues}
          boxItemOutActions={boxItemOutActions}
          nextValues={nextValues}
          entriesFinderItemsActions={entriesFinderItemsActions}
          entriesFinderItems={entriesFinderItems}
          itemActions={itemActions}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
        />
      </Segment>
    );
  }
}

ProjectItemSegmentBoxOutputs.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectItemSegmentBoxOutputs;

/**
 *
 * ProjectItemSegmentBoxOuts
 *
 */

import { IMMUTABLE_MAP } from '~/containers/App/constants';
import { Map, List } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { getId } from '~/containers/App/getters/projectBoxItemOut';
import { getBoxItemOut } from '~/containers/App/getters/projectItem';

import ProjectBoxItemOutInteractingOutputs from '../../BoxItemOut/Interacting/Outputs';
import ProjectBoxItemOutInteractingOutputsProbDetail from '../../BoxItemOut/Interacting/OutputsProbDetail';
import ProjectBoxItemOutLabelDetail from '../../BoxItemOutLabelDetail';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemSegmentBoxOuts extends React.PureComponent {
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

    const boxItemOut = getBoxItemOut(itemNextValues.get('nextValue'), {
      entry: item,
    });

    if (!boxItemOut) {
      return <div>Outputs not defined</div>;
    }

    const boxItemOutNextValues = nextValues.get(
      getId(undefined, { entry: boxItemOut }),
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

ProjectItemSegmentBoxOuts.propTypes = {
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

export default ProjectItemSegmentBoxOuts;

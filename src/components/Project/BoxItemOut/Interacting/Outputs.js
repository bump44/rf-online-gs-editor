/**
 *
 * ProjectBoxItemOutInteractingOutputs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Comment } from 'semantic-ui-react';
import ProjectBoxItemOutInteractingOutput from './Output';

const groupStyle = { maxWidth: '100%' };

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutInteractingOutputs extends React.PureComponent {
  render() {
    const {
      boxItemOut,
      boxItemOutNextValues,
      boxItemOutActions,
      localSettings,
      nextValues,
      itemActions,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    return (
      <Comment.Group style={groupStyle}>
        {Array.from(Array(61)).map((_, index) => (
          <ProjectBoxItemOutInteractingOutput
            boxItemOut={boxItemOut}
            boxItemOutNextValues={boxItemOutNextValues}
            boxItemOutActions={boxItemOutActions}
            localSettings={localSettings}
            nextValues={nextValues}
            itemActions={itemActions}
            moneyTypes={moneyTypes}
            itemGradeTypes={itemGradeTypes}
            weaponTypes={weaponTypes}
            entriesFinderItems={entriesFinderItems}
            entriesFinderItemsActions={entriesFinderItemsActions}
            index={index}
            key={index + 1} // eslint-disable-line
          />
        ))}
      </Comment.Group>
    );
  }
}

ProjectBoxItemOutInteractingOutputs.propTypes = {
  boxItemOut: PropTypes.instanceOf(Map).isRequired,
  boxItemOutNextValues: PropTypes.instanceOf(Map).isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
};

ProjectBoxItemOutInteractingOutputs.defaultProps = {};

export default ProjectBoxItemOutInteractingOutputs;

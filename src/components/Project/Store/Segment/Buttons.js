/**
 *
 * ProjectStoreSegmentButtons
 *
 */

import { Map, List } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import ProjectStoreInteractingButtonType from '../Interacting/ButtonType';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreSegmentButtons extends React.PureComponent {
  render() {
    const { store, storeNextValues, buttonTypes, storeActions } = this.props;

    return (
      <Segment>
        {Array.from(Array(10)).map((_, index) => (
          <ProjectStoreInteractingButtonType
            store={store}
            storeNextValues={storeNextValues}
            types={buttonTypes}
            onChangeValue={storeActions.changeNpcClass}
            n={index + 1}
            key={index + 1} // eslint-disable-line
            className="mb-10"
          />
        ))}
      </Segment>
    );
  }
}

ProjectStoreSegmentButtons.propTypes = {
  buttonTypes: PropTypes.instanceOf(List).isRequired,
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.shape({
    changeNpcClass: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProjectStoreSegmentButtons;

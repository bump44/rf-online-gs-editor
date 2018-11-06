/**
 *
 * ProjectStoreSegmentResources
 *
 */

import { Map } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import { IMMUTABLE_MAP } from '~/containers/App/constants';
import { getResources } from '~/containers/App/getters/projectStore';
import ProjectResourceSegmentBasic from '../../Resource/Segment/Basic';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreSegmentResources extends React.PureComponent {
  render() {
    const { store, storeNextValues, nextValues, resourceActions } = this.props;
    const storeNextValue = storeNextValues.get('nextValue');
    const resources = getResources(storeNextValue, {
      entry: store,
    });

    return (
      <Segment>
        {resources.map(resource => (
          <ProjectResourceSegmentBasic
            key={resource.get('id')}
            resource={resource}
            resourceNextValues={nextValues.get(
              resource.get('id'),
              IMMUTABLE_MAP,
            )}
            nextValues={nextValues}
            resourceActions={resourceActions}
          />
        ))}
      </Segment>
    );
  }
}

ProjectStoreSegmentResources.propTypes = {
  resourceActions: PropTypes.object.isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
};

export default ProjectStoreSegmentResources;

/**
 *
 * ProjectResource
 *
 */

import { FormattedMessage } from 'react-intl';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectResource extends React.PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProjectResource.propTypes = {};

export default ProjectResource;

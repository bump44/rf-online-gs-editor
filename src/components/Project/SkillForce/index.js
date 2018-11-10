/**
 *
 * ProjectSkillForce
 *
 */

import { FormattedMessage } from 'react-intl';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectSkillForce extends React.PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProjectSkillForce.propTypes = {};

export default ProjectSkillForce;

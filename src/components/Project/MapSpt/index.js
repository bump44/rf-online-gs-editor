/**
 *
 * ProjectMapSpt
 *
 */

import { FormattedMessage } from 'react-intl';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectMapSpt extends React.PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProjectMapSpt.propTypes = {};

export default ProjectMapSpt;

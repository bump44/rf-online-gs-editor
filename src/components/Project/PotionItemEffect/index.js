/**
 *
 * ProjectPotionItemEffect
 *
 */

import { FormattedMessage } from 'react-intl';
import React from 'react';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectPotionItemEffect extends React.PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ProjectPotionItemEffect.propTypes = {};

export default ProjectPotionItemEffect;

/**
 *
 * ProjectBoxItemOutInteractingOutputsProbDetail
 *
 */

import { FormattedMessage } from 'react-intl';
import { Label } from 'semantic-ui-react';
import { Map } from 'immutable';
import * as projectBoxItemOut from '~/containers/App/getters/projectBoxItemOut';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutInteractingOutputsProbDetail extends React.PureComponent {
  render() {
    const { boxItemOutNextValues, boxItemOut } = this.props;
    const outputsProb = projectBoxItemOut.getOutputsProb(
      boxItemOutNextValues.get('nextValue'),
      {
        entry: boxItemOut,
      },
    );

    const isCorrect = outputsProb === 10000;
    const expected = outputsProb - 10000;

    return (
      <React.Fragment>
        <Label color="grey">
          <FormattedMessage {...messages.TotalProbability} />:
        </Label>
        {isCorrect && (
          <Label color="green">
            <FormattedMessage {...messages.isCorrect} />
          </Label>
        )}
        {!isCorrect && (
          <Label color="red">
            <FormattedMessage {...messages.incorrect} />
            :&nbsp;
            {outputsProb}
            {expected < 0 ? '+' : '-'}
            <i>{expected.toString().replace(/[^\d]/g, '')}</i>
          </Label>
        )}
      </React.Fragment>
    );
  }
}

ProjectBoxItemOutInteractingOutputsProbDetail.propTypes = {
  boxItemOut: PropTypes.instanceOf(Map).isRequired,
  boxItemOutNextValues: PropTypes.instanceOf(Map).isRequired,
};

ProjectBoxItemOutInteractingOutputsProbDetail.defaultProps = {};

export default ProjectBoxItemOutInteractingOutputsProbDetail;

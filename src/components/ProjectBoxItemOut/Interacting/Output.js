/**
 *
 * ProjectBoxItemOutInteractingOutput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt, min, max } from 'lodash';
import { Map } from 'immutable';
import { Comment, Input } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { IMMUTABLE_MAP } from '../../../containers/App/constants';
import messages from '../messages';

import * as projectItem from '../../../containers/App/getters/projectItem';
import * as projectBoxItemOut from '../../../containers/App/getters/projectBoxItemOut';

import ProjectItemLabelDetail from '../../ProjectItemLabelDetail';

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutInteractingOutput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickDisable = () => {
      const { boxItemOutActions, boxItemOut, index } = this.props;
      boxItemOutActions.outputDisable(boxItemOut, index + 1);
    };

    this.changeOutputCode = evt => {
      const { boxItemOutActions, boxItemOut, index } = this.props;
      boxItemOutActions.changeOutputCode(boxItemOut, {
        n: index + 1,
        code: evt.target.value,
      });
    };

    this.changeOutputCount = evt => {
      const { boxItemOutActions, boxItemOut, index } = this.props;
      boxItemOutActions.changeOutputCount(boxItemOut, {
        n: index + 1,
        count: parseInt(evt.target.value) || 0,
      });
    };

    this.changeOutputProb = evt => {
      const { boxItemOutActions, boxItemOut, index } = this.props;
      boxItemOutActions.changeOutputProb(boxItemOut, {
        n: index + 1,
        prob: parseInt(evt.target.value) || 0,
      });
    };

    this.changeOutputProbPercent = evt => {
      const { boxItemOutActions, boxItemOut, index } = this.props;
      const percent = min([
        max([parseFloat((parseFloat(evt.target.value) || 0).toFixed(2)), 0.01]),
        100,
      ]);

      const prob = parseInt((10000 / 100) * percent);
      boxItemOutActions.changeOutputProb(boxItemOut, {
        n: index + 1,
        prob,
      });
    };
  }

  render() {
    const {
      boxItemOut,
      boxItemOutNextValues,
      index,
      nextValues,
      itemActions,
    } = this.props;

    const n = index + 1;
    const output = projectBoxItemOut.getOutput(
      boxItemOutNextValues.get('nextValue'),
      { entry: boxItemOut },
      { n },
    );

    const { item } = output;
    const itemNextValues =
      (item
        ? nextValues.get(projectItem.getId(undefined, { entry: item }))
        : IMMUTABLE_MAP) || IMMUTABLE_MAP;

    return (
      <Comment key={output.n}>
        <Comment.Author>№{output.n}</Comment.Author>
        {item && (
          <Comment.Metadata>
            <div>
              <ProjectItemLabelDetail
                item={item}
                itemNextValues={itemNextValues}
                itemActions={itemActions}
              />
            </div>
          </Comment.Metadata>
        )}
        <Comment.Text>
          <Input
            value={output.code}
            size="mini"
            label="Code"
            className="mr-10 mb-5"
            onChange={this.changeOutputCode}
          />
          <Input
            value={output.count}
            size="mini"
            label="Count"
            className="mr-10 mb-5"
            min={1}
            max={99}
            type="number"
            onChange={this.changeOutputCount}
            error={output.count <= 0 || output.count > 99}
          />
          <Input
            value={output.prob}
            size="mini"
            label="Probability"
            className="mr-10 mb-5"
            min={1}
            max={10000}
            type="number"
            onChange={this.changeOutputProb}
            error={output.prob <= 0 || output.prob > 10000}
          />
          <Input
            value={output.probPercent}
            type="number"
            step="0.1"
            size="mini"
            label="As %"
            className="mr-10 mb-5"
            max={100}
            onChange={this.changeOutputProbPercent}
          />
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={this.onClickDisable}>
            <FormattedMessage {...messages.Disable} />
          </Comment.Action>
        </Comment.Actions>
      </Comment>
    );
  }
}

ProjectBoxItemOutInteractingOutput.propTypes = {
  boxItemOut: PropTypes.instanceOf(Map).isRequired,
  boxItemOutNextValues: PropTypes.instanceOf(Map).isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  // localSettings: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  // moneyTypes: PropTypes.instanceOf(List).isRequired,
  // itemGrades: PropTypes.instanceOf(List).isRequired,
  // weaponTypes: PropTypes.instanceOf(List).isRequired,
  // entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  // entriesFinderItemsActions: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

ProjectBoxItemOutInteractingOutput.defaultProps = {};

export default ProjectBoxItemOutInteractingOutput;

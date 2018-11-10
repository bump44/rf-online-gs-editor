/**
 *
 * ProjectBoxItemOutInteractingOutput
 *
 */

import { Comment, Input, Label, Modal } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { Map, List } from 'immutable';
import { parseInt, min, max } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { IMMUTABLE_MAP } from '~/containers/App/constants';
import * as projectBoxItemOut from '~/containers/App/getters/projectBoxItemOut';
import * as projectItem from '~/containers/App/getters/projectItem';

import messages from '../messages';
import ProjectItemLabelDetail from '../../ItemLabelDetail';
import ProjectItemsFinder from '../../ItemsFinder';

const modalSelectItemStyle = {
  main: { height: 'calc(100% - 60px)', left: 'initial !important' },
  content: { height: 'calc(100% - 90px)' },
};

/* eslint-disable react/prefer-stateless-function */
class ProjectBoxItemOutInteractingOutput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.itemListSelected = this.itemListSelected.bind(this);

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

    this.toggleSelectItemModal = () =>
      this.setState(prevState => ({
        selectItemModalOpen: !prevState.selectItemModalOpen,
      }));

    this.state = { selectItemModalOpen: false };
  }

  itemListSelected(item, itemNextValues) {
    this.setState({ selectItemModalOpen: false });
    const itemNextValue = itemNextValues.get('nextValue');
    const { boxItemOut, boxItemOutActions, index } = this.props;

    boxItemOutActions.changeOutputCode(boxItemOut, {
      n: index + 1,
      code: projectItem.getServerCode(itemNextValue, { entry: item }),
    });

    boxItemOutActions.changeOutputItem(boxItemOut, {
      n: index + 1,
      item,
    });
  }

  render() {
    const {
      boxItemOut,
      boxItemOutNextValues,
      index,
      nextValues,
      itemActions,
      entriesFinderItems,
      entriesFinderItemsActions,
      itemGradeTypes,
      weaponTypes,
      localSettings,
      moneyTypes,
    } = this.props;

    const { selectItemModalOpen } = this.state;

    const n = index + 1;
    const output = projectBoxItemOut.getOutput(
      boxItemOutNextValues.get('nextValue'),
      { entry: boxItemOut, nextValues },
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
          <Comment.Text>
            <ProjectItemLabelDetail
              item={item}
              itemNextValues={itemNextValues}
              itemActions={itemActions}
            />
            <Label>
              {projectItem.getName(itemNextValues, { entry: item })}
            </Label>
          </Comment.Text>
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
          <Modal
            trigger={
              <Comment.Action onClick={this.toggleSelectItemModal}>
                <FormattedMessage {...messages.SelectItem} />
              </Comment.Action>
            }
            size="fullscreen"
            style={modalSelectItemStyle.main}
            onClose={this.toggleSelectItemModal}
            open={selectItemModalOpen}
          >
            <Modal.Header>
              <FormattedMessage {...messages.SelectItem} />
            </Modal.Header>
            <Modal.Content style={modalSelectItemStyle.content}>
              <ProjectItemsFinder
                state={entriesFinderItems}
                actions={entriesFinderItemsActions}
                nextValues={nextValues}
                itemActions={itemActions}
                itemGradeTypes={itemGradeTypes}
                weaponTypes={weaponTypes}
                localSettings={localSettings}
                moneyTypes={moneyTypes}
                selectable
                onClickSelect={this.itemListSelected}
              />
            </Modal.Content>
          </Modal>
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
  localSettings: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  itemActions: PropTypes.object.isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

ProjectBoxItemOutInteractingOutput.defaultProps = {};

export default ProjectBoxItemOutInteractingOutput;

/**
 *
 * ProjectStoreInteractingItemList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map, List } from 'immutable';
import { Comment, Input, Icon, Label, Button, Modal } from 'semantic-ui-react';

import {
  IMMUTABLE_MAP,
  AUTO_REVERSE_CLIENT_CODES,
} from '../../../containers/App/constants';

import { getClientCode } from '../../../utils/converters';

import * as projectStore from '../../../containers/App/getters/projectStore';
import * as projectItem from '../../../containers/App/getters/projectItem';

import ProjectItemLabelDetail from '../../ProjectItemLabelDetail';
import ProjectItemInteractingName from '../../ProjectItem/Interacting/Name';
import ProjectItemInteractingItemGrade from '../../ProjectItem/Interacting/ItemGrade';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderLabels = this.renderLabels.bind(this);
    this.itemListRemoveAndReshuffle = this.itemListRemoveAndReshuffle.bind(
      this,
    );
  }

  itemListRemoveAndReshuffle() {
    const { item, actions, index } = this.props;
    actions.itemListRemove(item, index + 1);
    // actions.itemsListReshuffle(item);
  }

  getConvClientCode(code) {
    try {
      return getClientCode(code);
    } catch (err) {
      // ignore
      return undefined;
    }
  }

  renderLabels(item) {
    if (!item) {
      return null;
    }

    const { projectNextValues, itemActions, itemGrades } = this.props;
    const id = projectItem.getId(undefined, { item });
    const nextValues = projectNextValues.get(id, IMMUTABLE_MAP);
    const nextValue = nextValues.get('nextValue');

    return (
      <React.Fragment>
        <ProjectItemLabelDetail
          item={item}
          itemNextValues={nextValues}
          size="mini"
        />
        <ProjectItemInteractingItemGrade
          item={item}
          itemNextValues={nextValues}
          onChangeValue={itemActions.changeItemGrade}
          className="item-grade"
          types={itemGrades}
        />
        <Modal
          trigger={
            <Label size="mini" color="blue" as={Button}>
              {projectItem.getName(nextValue, { item })}
            </Label>
          }
          size="large"
        >
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <ProjectItemInteractingName
                item={item}
                itemNextValues={nextValues}
                onChangeValue={itemActions.changeName}
                size="mini"
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }

  render() {
    const {
      item,
      itemNextValues,
      index,
      dragHandle,
      localSettings,
    } = this.props;

    const autoReverseClientCodes = localSettings.get(AUTO_REVERSE_CLIENT_CODES);
    const nextValue = itemNextValues.get('nextValue');
    const itemList = projectStore.getItemList(
      nextValue,
      { item },
      { n: index + 1 },
    );

    /* eslint-disable indent */
    const clientCode =
      autoReverseClientCodes && itemList.clientCode
        ? itemList.clientCode
            .split(/(.{2})/g)
            .reverse()
            .join('')
        : itemList.clientCode;
    /* eslint-enable indent */

    const convClientCode = this.getConvClientCode(itemList.serverCode);
    const itemReal = itemList.server || itemList.client;

    return (
      <CommentGroup>
        <Comment>
          {dragHandle && dragHandle}

          <Comment.Content>
            <Comment.Author>
              <Label size="mini">№{index + 1}</Label>
              {itemReal && this.renderLabels(itemReal)}
            </Comment.Author>

            <Comment.Text>
              <Label size="mini">{itemList.clientType}</Label>
              <Input
                className="ml-5 mr-10"
                size="mini"
                value={clientCode}
                error={convClientCode !== itemList.clientCode}
                disabled
              />
              <Icon
                name={
                  convClientCode !== itemList.clientCode ? 'unlink' : 'linkify'
                }
              />
              <Input
                className="ml-5"
                size="mini"
                value={itemList.serverCode}
                error={convClientCode !== itemList.clientCode}
                disabled
              />
            </Comment.Text>

            <Comment.Actions>
              <Comment.Action>Select item</Comment.Action>
              <Comment.Action onClick={this.itemListRemoveAndReshuffle}>
                Remove & Reshuffle
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </CommentGroup>
    );
  }
}

ProjectStoreInteractingItemList.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  actions: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  dragHandle: PropTypes.node,
  projectNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  // moneyTypes: PropTypes.instanceOf(Map).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
};

ProjectStoreInteractingItemList.defaultProps = {
  dragHandle: undefined,
};

export default ProjectStoreInteractingItemList;

const CommentGroup = styled(Comment.Group)`
  &.ui.comments {
    margin: 0;
    max-width: 100%;
    margin-right: 15px;
    background: #fff;
    height: 100%;

    .item-grade {
      margin: 0;
      position: relative;
      top: 1px;
      > .text {
        margin: 0;
        padding-bottom: 1px;
      }
    }

    .comment {
      height: 100%;
      &:hover {
        background: #f9f9f9;
      }

      .content {
        padding: 5px;

        .author {
          font-size: 12px;
        }

        .text {
          .input {
            input {
              padding: 3px;
            }
          }
        }
      }

      .draghandle {
        float: left;
        height: 100%;
        display: flex;
        padding: 10px;
        align-items: center;
        background: #f9f9f9;
        margin-right: 15px;

        &:hover {
          background: #f1f1f1;
          cursor: pointer;
        }
      }
    }
  }
`;

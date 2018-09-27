/**
 *
 * ProjectStoreInteractingItemList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map } from 'immutable';
import { Comment, Input } from 'semantic-ui-react';
import * as projectStore from '../../../containers/App/getters/projectStore';
import * as projectItem from '../../../containers/App/getters/projectItem';

import ProjectItemTypeSelect from '../../ProjectItemTypeSelect';
import { getTypeNameByFinite } from '../../../structs/item_types_utils';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingItemList extends React.PureComponent {
  render() {
    const { item, itemNextValues, index, dragHandle } = this.props;
    const nextValue = itemNextValues.get('nextValue');

    const itemList = projectStore.getItemList(
      nextValue,
      { item },
      { n: index + 1 },
    );

    return (
      <CommentGroup>
        <Comment>
          {dragHandle && dragHandle}

          <Comment.Content>
            <Comment.Author>
              №{index + 1}
              &nbsp;
              {projectItem.getName(null, {
                item: item.getIn(['client', `itemList__${index + 1}`]),
              })}
            </Comment.Author>
            <Comment.Text>
              <ProjectItemTypeSelect
                value={getTypeNameByFinite(itemList.clientType)}
              />
              <Input className="ml-5" size="mini" value={itemList.clientCode} />
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </CommentGroup>
    );
  }
}

ProjectStoreInteractingItemList.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  index: PropTypes.number.isRequired,
  dragHandle: PropTypes.node,
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

    .comment {
      height: 100%;
      &:hover {
        background: #f9f9f9;
      }

      .content {
        padding: 5px;

        .text {
          .input {
            margin-right: 15px;
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

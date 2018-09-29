/**
 *
 * ProjectStoreInteractingItemList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Map, List } from 'immutable';
import {
  Comment,
  Input,
  Icon,
  Label,
  Button,
  Modal,
  Dimmer,
  Header,
} from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

import {
  IMMUTABLE_MAP,
  AUTO_REVERSE_CLIENT_CODES,
} from '../../../containers/App/constants';

import { getClientCode } from '../../../utils/converters';

import * as projectStore from '../../../containers/App/getters/projectStore';
import * as projectItem from '../../../containers/App/getters/projectItem';

import ProjectItemsFinder from '../../ProjectItemsFinder';
import ProjectItemLabelDetail from '../../ProjectItemLabelDetail';
import projectItemSegmentBasicResolvers from '../../ProjectItem/segmentBasicResolvers';

const modalSelectItemStyle = {
  main: { height: 'calc(100% - 60px)', left: 'initial !important' },
  content: { height: 'calc(100% - 90px)' },
};

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreInteractingItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderLabels = this.renderLabels.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderDimmer = this.renderDimmer.bind(this);

    this.itemListSelected = this.itemListSelected.bind(this);

    this.itemListRemove = this.itemListRemove.bind(this);
    this.itemsListReshuffle = this.itemsListReshuffle.bind(this);
    this.itemsListCountNextN = this.itemsListCountNextN.bind(this);
    this.itemsListCountNextIndex = this.itemsListCountNextIndex.bind(this);
    this.toggleSelectItemModal = () =>
      this.setState(prevState => ({
        selectItemModalOpen: !prevState.selectItemModalOpen,
      }));

    this.state = { selectItemModalOpen: false };
  }

  itemListSelected(item, itemNextValues) {
    this.setState({ selectItemModalOpen: false });
    const itemNextValue = itemNextValues.get('nextValue');
    const { store, storeActions, index } = this.props;
    const serverCode = projectItem.getServerCode(itemNextValue, {
      entry: item,
    });
    const clientCode =
      projectItem.getClientCode(itemNextValue, {
        entry: item,
      }) || this.getConvClientCode(serverCode);
    const clientType = projectItem.getClientTypeFinite(itemNextValue, {
      entry: item,
    });

    storeActions.itemListUpdate(store, {
      n: index + 1,
      clientCode,
      clientType,
      serverCode,
      itemList: item,
    });
  }

  itemListRemove() {
    const { store, storeActions, index } = this.props;
    storeActions.itemListRemove(store, index + 1);
  }

  itemsListReshuffle() {
    const { store, storeActions } = this.props;
    storeActions.itemsListReshuffle(store);
  }

  itemsListCountNextN() {
    const { store, index, storeActions } = this.props;
    storeActions.changeItemsListCount(store, index + 1);
  }

  itemsListCountNextIndex() {
    const { store, index, storeActions } = this.props;
    storeActions.changeItemsListCount(store, index);
  }

  getConvClientCode(code) {
    try {
      return getClientCode(code);
    } catch (err) {
      // ignore
      return undefined;
    }
  }

  renderDimmer() {
    return (
      <Dimmer active>
        <Header sub inverted>
          <FormattedMessage {...messages.ItemRowIsDisabled} />
        </Header>
        <Button primary size="mini" onClick={this.itemsListCountNextN}>
          <Icon name="check circle" />
          <FormattedMessage {...messages.Enable} />
        </Button>
      </Dimmer>
    );
  }

  renderContent() {
    const {
      store,
      storeNextValues,
      nextValues,
      index,
      dragHandle,
      itemActions,
      itemGrades,
      weaponTypes,
      localSettings,
      moneyTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    const { selectItemModalOpen } = this.state;

    const autoReverseClientCodes = localSettings.get(AUTO_REVERSE_CLIENT_CODES);
    const nextValue = storeNextValues.get('nextValue');
    const itemList = projectStore.getItemList(
      nextValue,
      { entry: store },
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
    const n = index + 1;

    return (
      <React.Fragment>
        {dragHandle && dragHandle}

        <Comment.Content>
          <Comment.Author>
            <Label size="mini">№{n}</Label>
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
                  itemGrades={itemGrades}
                  weaponTypes={weaponTypes}
                  localSettings={localSettings}
                  moneyTypes={moneyTypes}
                  selectable
                  onClickSelect={this.itemListSelected}
                />
              </Modal.Content>
            </Modal>
            <Comment.Action onClick={this.itemListRemove}>
              <FormattedMessage {...messages.Remove} />
            </Comment.Action>
            <Comment.Action onClick={this.itemsListReshuffle}>
              <FormattedMessage {...messages.Reshuffle} />
            </Comment.Action>
            <Comment.Action onClick={this.itemsListCountNextIndex}>
              <FormattedMessage {...messages.Disable} />
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </React.Fragment>
    );
  }

  renderLabels(item) {
    if (!item) {
      return null;
    }

    const {
      nextValues,
      itemActions,
      localSettings,
      moneyTypes,
      itemGrades,
      weaponTypes,
    } = this.props;

    const id = projectItem.getId(undefined, { entry: item });
    const itemNextValues = nextValues.get(id, IMMUTABLE_MAP);
    const itemNextValue = itemNextValues.get('nextValue');
    const ProjectItemSegmentBasicResolver =
      projectItemSegmentBasicResolvers[
        projectItem.getType(itemNextValue, { entry: item })
      ];

    return (
      <React.Fragment>
        <ProjectItemLabelDetail
          item={item}
          itemNextValues={nextValues}
          size="mini"
        />
        <Modal
          trigger={
            <Label size="mini" color="blue" as={Button}>
              {projectItem.getName(itemNextValue, { entry: item }) || '—'}
            </Label>
          }
          size="fullscreen"
        >
          <Modal.Header>
            <FormattedMessage
              {...messages.EditingAnItem}
              values={{
                name:
                  projectItem.getName(itemNextValue, { entry: item }) || '—',
              }}
            />
            <ProjectItemLabelDetail
              item={item}
              itemNextValues={itemNextValues}
              link={false}
            />
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {ProjectItemSegmentBasicResolver && (
                <ProjectItemSegmentBasicResolver
                  item={item}
                  itemNextValues={itemNextValues}
                  itemActions={itemActions}
                  localSettings={localSettings}
                  moneyTypes={moneyTypes}
                  itemGrades={itemGrades}
                  weaponTypes={weaponTypes}
                />
              )}
              {!ProjectItemSegmentBasicResolver && (
                <FormattedMessage {...messages.ItemBasicSegmentNotDefined} />
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }

  render() {
    const { store, storeNextValues, index } = this.props;
    const n = index + 1;

    const listCount = projectStore.getItemsListCount(
      storeNextValues.get('nextValue'),
      {
        entry: store,
      },
    );

    return (
      <CommentGroup>
        <Comment>
          {n > listCount ? this.renderDimmer() : this.renderContent()}
        </Comment>
      </CommentGroup>
    );
  }
}

ProjectStoreInteractingItemList.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  storeActions: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  dragHandle: PropTypes.node,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGrades: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
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

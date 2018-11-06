/**
 *
 * ProjectStore
 *
 */

import { FormattedMessage } from 'react-intl';

import {
  Grid,
  Transition,
  Label,
  Tab,
  Divider,
  Button,
} from 'semantic-ui-react';

import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import { IMMUTABLE_MAP } from '~/containers/App/constants';
import * as projectStore from '~/containers/App/getters/projectStore';
import { getSubTask } from '~/containers/App/getters/nextValues';

import messages from './messages';
import ProjectStoreInteractingName from './Interacting/Name';
import ProjectStoreInteractingLastName from './Interacting/LastName';
import ProjectStoreInteractingTrade from './Interacting/Trade';
import ProjectStoreInteractingUseAngle from './Interacting/UseAngle';
import ProjectStoreInteractingSize from './Interacting/Size';
import ProjectStoreInteractingAngle from './Interacting/Angle';
import ProjectStoreInteractingItemsList from './Interacting/ItemsList';
import ProjectStoreInteractingItemsListCount from './Interacting/ItemsListCount';
import ProjectStoreInteractingButtonType from './Interacting/ButtonType';
import ProjectStoreInteractingMapNameType from './Interacting/MapNameType';

import ProjectResourceSegmentBasic from '../Resource/Segment/Basic';
import ProjectMapSptSegmentBasic from '../MapSpt/Segment/Basic';
import ProjectStoreInteractingItemsListContentTxt from './Interacting/ItemsListContentTxt';
import ProjectStoreInteractingCode from './Interacting/Code';
import ProjectStoreInteractingModel from './Interacting/Model';
import Notification from '~/components/Notification';

const tabStyle = { height: '100%' };
const tabMenu = {
  secondary: true,
  pointing: true,
};
const tabPaneStyle = {
  padding: 0,
  background: 'none',
  border: 0,
  boxShadow: 'none',
  height: '100%',
};

/* eslint-disable react/prefer-stateless-function */
class ProjectStore extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getTabPanes = this.getTabPanes.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderBasic = this.renderBasic.bind(this);
    this.renderItemsList = this.renderItemsList.bind(this);
    this.renderLimItemsList = this.renderLimItemsList.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderBindings = this.renderBindings.bind(this);
    this.renderResources = this.renderResources.bind(this);

    this.copyAndRedirect = () => {
      const { store, storeActions } = this.props;
      storeActions.copyAndRedirect(store);
    };

    this.createMapSptSD = () => {
      const { store, storeActions, storeNextValues } = this.props;
      const mapName = projectStore.getMapCode(
        storeNextValues.get('nextValue'),
        { entry: store },
      );
      const strAnchor = projectStore.getSdCode(
        storeNextValues.get('nextValue'),
        {
          entry: store,
        },
      );
      storeActions.createMapSpt(store, {
        values: { mapName, strAnchor },
      });
    };

    this.createMapSptBD = () => {
      const { store, storeActions, storeNextValues } = this.props;
      const mapName = projectStore.getMapCode(
        storeNextValues.get('nextValue'),
        { entry: store },
      );
      const strAnchor = projectStore.getBdCode(
        storeNextValues.get('nextValue'),
        {
          entry: store,
        },
      );
      storeActions.createMapSpt(store, {
        values: { mapName, strAnchor },
      });
    };
  }

  getTabPanes() {
    const { store, storeNextValues } = this.props;

    return [
      {
        menuItem: {
          key: 'basics',
          content: <FormattedMessage {...messages.Basic} />,
        },
        render: this.renderBasic,
      },
      {
        menuItem: {
          key: 'buttons',
          content: <FormattedMessage {...messages.Buttons} />,
        },
        render: this.renderButtons,
      },
      {
        menuItem: {
          key: 'binding',
          content: <FormattedMessage {...messages.Binding} />,
        },
        render: this.renderBindings,
      },
      {
        menuItem: {
          key: 'resources',
          content: <FormattedMessage {...messages.Resources} />,
        },
        render: this.renderResources,
      },
      {
        menuItem: {
          key: 'itemsList',
          content: (
            <span>
              <FormattedMessage {...messages.ItemsList} />{' '}
              <u>
                {projectStore.getItemsListCount(
                  storeNextValues.get('nextValue'),
                  { entry: store },
                )}
              </u>
            </span>
          ),
        },
        render: this.renderItemsList,
      },
      {
        menuItem: {
          key: 'limItemsList',
          content: (
            <span>
              <FormattedMessage {...messages.LimItemsList} />{' '}
              <u>
                {projectStore.getLimItemsListCount(
                  storeNextValues.get('nextValue'),
                  { entry: store },
                )}
              </u>
            </span>
          ),
        },
        render: this.renderLimItemsList,
      },
    ];
  }

  renderBasic() {
    const { store, storeNextValues, storeActions } = this.props;

    const bUseAngle = projectStore.getUseAngle(
      storeNextValues.get('nextValue'),
      { entry: store },
    );

    return (
      <Tab.Pane attached={false}>
        <Grid columns={3}>
          <Grid.Column largeScreen={4} widescreen={5}>
            <ProjectStoreInteractingName
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeName}
              className="pb-5"
            />
            <ProjectStoreInteractingLastName
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeLastName}
            />
          </Grid.Column>
          <Grid.Column largeScreen={12} widescreen={11}>
            <Grid columns={2}>
              <Grid.Column>
                <ProjectStoreInteractingTrade
                  store={store}
                  storeNextValues={storeNextValues}
                  onChangeValue={storeActions.changeTrade}
                  className="pb-10"
                  label={
                    <Label>
                      <FormattedMessage {...messages.Trade} />
                    </Label>
                  }
                />
                <ProjectStoreInteractingUseAngle
                  store={store}
                  storeNextValues={storeNextValues}
                  onChangeValue={storeActions.changeUseAngle}
                />
              </Grid.Column>
              <Grid.Column>
                <ProjectStoreInteractingSize
                  store={store}
                  storeNextValues={storeNextValues}
                  onChangeValue={storeActions.changeSize}
                  className="pb-5"
                  label={
                    <Label>
                      <FormattedMessage {...messages.Size} />
                    </Label>
                  }
                />

                <Transition
                  visible={bUseAngle}
                  animation="scale"
                  duration={500}
                >
                  <div>
                    <ProjectStoreInteractingAngle
                      store={store}
                      storeNextValues={storeNextValues}
                      onChangeValue={storeActions.changeAngle}
                      label={
                        <Label>
                          <FormattedMessage {...messages.Angle} />
                        </Label>
                      }
                    />
                  </div>
                </Transition>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>

        <Grid columns="equal">
          <Grid.Column>
            <ProjectStoreInteractingCode
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeCode}
              label={
                <Label>
                  <FormattedMessage {...messages.Code} />
                </Label>
              }
            />
          </Grid.Column>
          <Grid.Column>
            <ProjectStoreInteractingModel
              store={store}
              storeNextValues={storeNextValues}
              onChangeValue={storeActions.changeModel}
              label={
                <Label>
                  <FormattedMessage {...messages.Model} />
                </Label>
              }
            />
          </Grid.Column>
        </Grid>

        <Divider />

        {storeNextValues.get('isError') && (
          <Notification type="danger">
            {storeNextValues.get('errorMessage')}
          </Notification>
        )}

        <Button
          primary
          onClick={this.copyAndRedirect}
          loading={storeNextValues.get('isCopying')}
        >
          Copy & Redirect
        </Button>
      </Tab.Pane>
    );
  }

  renderButtons() {
    const { store, storeNextValues, buttonTypes, storeActions } = this.props;

    return (
      <Tab.Pane attached={false}>
        {Array.from(Array(10)).map((_, index) => (
          <ProjectStoreInteractingButtonType
            store={store}
            storeNextValues={storeNextValues}
            types={buttonTypes}
            onChangeValue={storeActions.changeNpcClass}
            n={index + 1}
            key={index + 1} // eslint-disable-line
            className="mb-10"
          />
        ))}
      </Tab.Pane>
    );
  }

  renderBindings() {
    const {
      store,
      storeNextValues,
      nextValues,
      mapNameTypes,
      storeActions,
      mapSptActions,
    } = this.props;

    const storeNextValue = storeNextValues.get('nextValue');
    const sdCode = projectStore.getSdCode(storeNextValue, { entry: store });
    const bdCode = projectStore.getBdCode(storeNextValue, { entry: store });
    const mapCode = projectStore.getMapCode(storeNextValue, { entry: store });
    const mapSpts = projectStore.getMapSpts(storeNextValue, { entry: store });
    const sdIsExists = mapSpts.some(
      mapSpt => mapSpt.get('strAnchor') === sdCode,
    );
    const bdIsExists = mapSpts.some(
      mapSpt => mapSpt.get('strAnchor') === bdCode,
    );

    const actionCreateMapSpt = getSubTask(storeNextValues, 'createMapSpt');

    return (
      <Tab.Pane attached={false}>
        <Label color="green">{sdCode}</Label>
        <Label color="blue">{bdCode}</Label>
        <Label color="black">{mapCode}</Label>

        <Divider />

        {actionCreateMapSpt.isError && (
          <Notification type="danger">
            {actionCreateMapSpt.errorMessage}
          </Notification>
        )}

        {!sdIsExists && (
          <Button
            primary
            size="mini"
            disabled={actionCreateMapSpt.isProcessing}
            loading={actionCreateMapSpt.isProcessing}
            onClick={this.createMapSptSD}
          >
            Create SD MapSpt
          </Button>
        )}

        {!bdIsExists && (
          <Button
            primary
            size="mini"
            disabled={actionCreateMapSpt.isProcessing}
            loading={actionCreateMapSpt.isProcessing}
            onClick={this.createMapSptBD}
          >
            Create BD MapSpt
          </Button>
        )}

        {(!sdIsExists || !bdIsExists) && <Divider />}

        <ProjectStoreInteractingMapNameType
          store={store}
          storeNextValues={storeNextValues}
          types={mapNameTypes}
          onChangeValue={storeActions.changeMapCode}
          disabled={actionCreateMapSpt.isProcessing}
        />

        {mapSpts.map(mapSpt => (
          <ProjectMapSptSegmentBasic
            key={mapSpt.get('id')}
            mapSpt={mapSpt}
            mapSptNextValues={nextValues.get(mapSpt.get('id'), IMMUTABLE_MAP)}
            nextValues={nextValues}
            mapSptActions={mapSptActions}
            mapNameTypes={mapNameTypes}
          />
        ))}
      </Tab.Pane>
    );
  }

  renderResources() {
    const { store, storeNextValues, nextValues, resourceActions } = this.props;

    const storeNextValue = storeNextValues.get('nextValue');
    const resources = projectStore.getResources(storeNextValue, {
      entry: store,
    });

    const boneIsDefined = projectStore.getResourceBoneIsDefined(
      storeNextValue,
      { entry: store },
    );

    const meshIsDefined = projectStore.getResourceMeshIsDefined(
      storeNextValue,
      { entry: store },
    );

    const aniIsDefined = projectStore.getResourceAniIsDefined(storeNextValue, {
      entry: store,
    });

    return (
      <Tab.Pane attached={false}>
        {!boneIsDefined && <Button>Create Bone</Button>}
        {!meshIsDefined && <Button>Create Mesh</Button>}
        {!aniIsDefined && <Button>Create Ani</Button>}

        {resources.map(resource => (
          <ProjectResourceSegmentBasic
            key={resource.get('id')}
            resource={resource}
            resourceNextValues={nextValues.get(
              resource.get('id'),
              IMMUTABLE_MAP,
            )}
            nextValues={nextValues}
            resourceActions={resourceActions}
          />
        ))}
      </Tab.Pane>
    );
  }

  renderItemsList() {
    const {
      store,
      storeNextValues,
      nextValues,
      storeActions,
      itemActions,
      localSettings,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    return (
      <Tab.Pane attached={false} style={tabPaneStyle}>
        <ProjectStoreInteractingItemsListCount
          store={store}
          storeNextValues={storeNextValues}
          onChangeValue={storeActions.changeItemsListCount}
          label={
            <Label>
              <FormattedMessage {...messages.VendorItemsListCount} />
            </Label>
          }
          fluid={false}
          className="mb-15"
        />
        &nbsp;&nbsp;
        <ProjectStoreInteractingItemsListContentTxt
          store={store}
          storeNextValues={storeNextValues}
          nextValues={nextValues}
          storeActions={storeActions}
          localSettings={localSettings}
        />
        <ProjectStoreInteractingItemsList
          store={store}
          storeNextValues={storeNextValues}
          storeActions={storeActions}
          nextValues={nextValues}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          entriesFinderItems={entriesFinderItems}
          entriesFinderItemsActions={entriesFinderItemsActions}
        />
      </Tab.Pane>
    );
  }

  renderLimItemsList() {
    const {
      store,
      storeNextValues,
      nextValues,
      storeActions,
      itemActions,
      localSettings,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      entriesFinderItems,
      entriesFinderItemsActions,
    } = this.props;

    return (
      <Tab.Pane attached={false} style={tabPaneStyle}>
        <ProjectStoreInteractingItemsListCount
          store={store}
          storeNextValues={storeNextValues}
          onChangeValue={storeActions.changeLimItemsListCount}
          label={
            <Label>
              <FormattedMessage {...messages.VendorItemsListCount} />
            </Label>
          }
          fluid={false}
          className="mb-15"
          isLimitedList
        />

        <ProjectStoreInteractingItemsList
          store={store}
          storeNextValues={storeNextValues}
          storeActions={storeActions}
          nextValues={nextValues}
          itemActions={itemActions}
          localSettings={localSettings}
          moneyTypes={moneyTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          entriesFinderItems={entriesFinderItems}
          entriesFinderItemsActions={entriesFinderItemsActions}
          isLimitedList
        />
      </Tab.Pane>
    );
  }

  renderTabs() {
    return <Tab menu={tabMenu} panes={this.getTabPanes()} style={tabStyle} />;
  }

  render() {
    return this.renderTabs();
  }
}

ProjectStore.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,

  storeActions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeTrade: PropTypes.func.isRequired,
    changeUseAngle: PropTypes.func.isRequired,
  }).isRequired,

  itemActions: PropTypes.object.isRequired,
  mapSptActions: PropTypes.object.isRequired,
  resourceActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,

  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  mapNameTypes: PropTypes.instanceOf(List).isRequired,
};

export default ProjectStore;

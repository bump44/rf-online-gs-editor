/**
 *
 * ProjectStoreRow
 *
 */

import { Grid, Label } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import Code from '../../Code';
import ProjectStoreLabelDetail from '../StoreLabelDetail';
import Render from './Render';
import Row from './styles';

import {
  getMapNameType,
  getMapCode,
  getCode,
} from '~/containers/App/getters/projectStore';

/* eslint-disable react/prefer-stateless-function */
class ProjectStoreRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderTagIndexWithNextState = this.renderTagIndexWithNextState.bind(
      this,
    );
  }

  renderTagIndexWithNextState() {
    const { store, storeNextValues } = this.props;

    return (
      <ProjectStoreLabelDetail
        store={store}
        storeNextValues={storeNextValues}
        link
      />
    );
  }

  render() {
    const {
      store,
      storeNextValues,
      storeActions,
      moneyTypes,
      itemGradeTypes,
      weaponTypes,
      localSettings,
      mapNameTypes,
    } = this.props;

    const code = getCode(storeNextValues.get('nextValue'), { entry: store });
    const mapNameType = getMapNameType(storeNextValues.get('nextValue'), {
      entry: store,
      mapNameTypes,
    });

    const mapNameRaw = getMapCode(storeNextValues.get('nextValue'), {
      entry: store,
    });

    return (
      <Row>
        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            {this.renderTagIndexWithNextState()}

            {code && <Code>{code}</Code>}

            {(mapNameType || mapNameRaw) && (
              <div className="mt-10">
                <Label color="black">
                  {mapNameType ? mapNameType.get('title') : mapNameRaw}
                </Label>
              </div>
            )}
          </Grid.Column>
          <Grid.Column largeScreen={13} widescreen={14}>
            {Render && (
              <Render
                store={store}
                storeNextValues={storeNextValues}
                storeActions={storeActions}
                moneyTypes={moneyTypes}
                itemGradeTypes={itemGradeTypes}
                weaponTypes={weaponTypes}
                localSettings={localSettings}
                mapNameTypes={mapNameTypes}
              />
            )}
          </Grid.Column>
        </Grid>
      </Row>
    );
  }
}

ProjectStoreRow.propTypes = {
  store: PropTypes.instanceOf(Map).isRequired,
  storeNextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  mapNameTypes: PropTypes.instanceOf(List).isRequired,
  storeActions: PropTypes.object.isRequired,
};

export default ProjectStoreRow;

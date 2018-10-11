/**
 *
 * ProjectStoreRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { Grid } from 'semantic-ui-react';

import { AUTO_REVERSE_CLIENT_CODES } from '../../containers/App/constants';
import ProjectStoreLabelDetail from '../ProjectStoreLabelDetail';
import Render from './Render';
import Row from './styles';
import Code from '../Code';

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
    } = this.props;

    const autoReverseClientCodes = localSettings.get(AUTO_REVERSE_CLIENT_CODES);
    const serverStrCode = store.getIn(['server', 'strCode']) || '';
    const clientStrCode = store.getIn(['client', 'strCode']) || '';

    /* eslint-disable indent */
    const clientStrCodeReversed = autoReverseClientCodes
      ? clientStrCode
          .split(/(.{2})/g)
          .reverse()
          .join('')
      : clientStrCode;
    /* eslint-enable indent */

    const isShowStrCode = !!(serverStrCode || clientStrCodeReversed);

    return (
      <Row>
        <Grid columns={2}>
          <Grid.Column largeScreen={3} widescreen={2}>
            {this.renderTagIndexWithNextState()}

            <div className="mt-5">
              {isShowStrCode && (
                <Code
                  title={
                    serverStrCode && clientStrCodeReversed
                      ? clientStrCodeReversed
                      : undefined
                  }
                >
                  {serverStrCode || clientStrCodeReversed}
                </Code>
              )}
            </div>
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
  storeActions: PropTypes.object.isRequired,
};

export default ProjectStoreRow;

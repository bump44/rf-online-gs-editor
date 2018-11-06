/**
 *
 * ProjectStore
 *
 */

import { FormattedMessage } from 'react-intl';
import { Map, List } from 'immutable';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import messages from './messages';
import SegmentActions from './Segment/Actions';
import SegmentBasic from './Segment/Basic';
import SegmentBindings from './Segment/Bindings';
import SegmentButtons from './Segment/Buttons';
import SegmentItemsList from './Segment/ItemsList';
import SegmentLimItemsList from './Segment/LimItemsList';
import SegmentResources from './Segment/Resources';

import {
  getItemsListCount,
  getLimItemsListCount,
} from '~/containers/App/getters/projectStore';

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
    this.renderActions = this.renderActions.bind(this);
    this.renderItemsList = this.renderItemsList.bind(this);
    this.renderLimItemsList = this.renderLimItemsList.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderBindings = this.renderBindings.bind(this);
    this.renderResources = this.renderResources.bind(this);
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
          key: 'actions',
          content: <FormattedMessage {...messages.Actions} />,
        },
        render: this.renderActions,
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
                {getItemsListCount(storeNextValues.get('nextValue'), {
                  entry: store,
                })}
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
                {getLimItemsListCount(storeNextValues.get('nextValue'), {
                  entry: store,
                })}
              </u>
            </span>
          ),
        },
        render: this.renderLimItemsList,
      },
    ];
  }

  renderBasic() {
    return <SegmentBasic {...this.props} />;
  }

  renderActions() {
    return <SegmentActions {...this.props} />;
  }

  renderButtons() {
    return <SegmentButtons {...this.props} />;
  }

  renderBindings() {
    return <SegmentBindings {...this.props} />;
  }

  renderResources() {
    return <SegmentResources {...this.props} />;
  }

  renderItemsList() {
    return <SegmentItemsList {...this.props} style={tabPaneStyle} />;
  }

  renderLimItemsList() {
    return <SegmentLimItemsList {...this.props} style={tabPaneStyle} />;
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

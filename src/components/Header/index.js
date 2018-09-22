/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import { Icon, Popup, Button } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import packagejson from '../../../package.json';
import Menu, {
  BrandLink,
  BrandContent,
  BrandVersion,
  UserUserName,
  UserLink,
} from './styles';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    const {
      isLoggedIn,
      currentUser,
      currentProject,
      onClickLogout,
      projectsImportsProcessingData,
    } = this.props;

    const projectsImportsIsProcessing =
      projectsImportsProcessingData &&
      projectsImportsProcessingData.isProcessing;

    return (
      <Menu inverted color="violet">
        <Menu.Item as={BrandLink} to="/" exact>
          <BrandContent>
            <FormattedMessage {...messages.brand} />
            <BrandVersion>v{packagejson.version}</BrandVersion>
          </BrandContent>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/projects">
          <FormattedMessage {...messages.Projects} />
        </Menu.Item>
        {currentProject && (
          <Menu.Item as={NavLink} to={`/project/${currentProject.get('id')}`}>
            <Icon name="info" />
            {currentProject.get('title')}
          </Menu.Item>
        )}
        {projectsImportsIsProcessing && (
          <Menu.Item>
            {projectsImportsProcessingData.percent.toFixed(0)}%
          </Menu.Item>
        )}
        <Menu.Menu position="right">
          {isLoggedIn && (
            <React.Fragment>
              <Popup
                size="mini"
                inverted
                trigger={
                  <Menu.Item as={UserLink} to="/">
                    <UserUserName>
                      <Icon name="user" />
                      {currentUser.get('login')}
                    </UserUserName>
                  </Menu.Item>
                }
                content={currentUser.getIn(['role', 'title'])}
              />
              <Popup
                size="mini"
                inverted
                trigger={
                  <Menu.Item as={NavLink} to="/project/create">
                    <Icon name="plus" fitted />
                  </Menu.Item>
                }
                content="Create new project"
              />
              <Menu.Item>
                <Button color="red" onClick={onClickLogout}>
                  <Icon name="sign out" fitted />
                </Button>
              </Menu.Item>
            </React.Fragment>
          )}
          {!isLoggedIn && (
            <React.Fragment>
              <Menu.Item as={NavLink} to="/login">
                <Icon name="sign in" />
                <FormattedMessage {...messages.signIn} />
              </Menu.Item>
              <Menu.Item as={NavLink} to="/register">
                <Icon name="signup" />
                <FormattedMessage {...messages.signUp} />
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.instanceOf(Map),
  currentProject: PropTypes.instanceOf(Map),
  onClickLogout: PropTypes.func.isRequired,
  projectsImportsProcessingData: PropTypes.shape({
    isProcessing: PropTypes.bool.isRequired,
    countTotal: PropTypes.number.isRequired,
    countCompleted: PropTypes.number.isRequired,
    countProcesses: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
  currentUser: null,
  currentProject: null,
};

export default Header;

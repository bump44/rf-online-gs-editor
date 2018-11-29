/**
 *
 * Header
 *
 */

import { FormattedMessage } from 'react-intl';
import { Icon, Popup, Button, Dropdown, Flag } from 'semantic-ui-react';
import { isFunction } from 'lodash';
import { Map } from 'immutable';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import application from '~/package';
import i18n from '../../i18n';
import messages from './messages';

import Menu, {
  BrandLink,
  BrandContent,
  BrandVersion,
  UserUserName,
  UserLink,
} from './styles';

const localeFlags = { en: 'us' };

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
        <Popup
          trigger={
            <Menu.Item as={BrandLink} to="/" exact>
              <BrandContent>
                <FormattedMessage {...messages.brand} />
                <BrandVersion>v{application.version}</BrandVersion>
              </BrandContent>
            </Menu.Item>
          }
          content={process.env.NODE_ENV}
          size="mini"
          inverted
        />

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
          <FormattedMessage {...messages.Options}>
            {message => (
              <Dropdown text={message} pointing item position="left">
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <FormattedMessage {...messages.Customs} />
                  </Dropdown.Header>
                  <React.Fragment>
                    <Dropdown.Item as={NavLink} to="/">
                      <Icon name="cog" />
                      <FormattedMessage {...messages.LocalSettings} />
                    </Dropdown.Item>
                  </React.Fragment>
                  <Dropdown.Divider />
                  <Dropdown.Header>
                    <FormattedMessage {...messages.Language} />
                  </Dropdown.Header>
                  {i18n.appLocales.map(locale => (
                    <Dropdown.Item key={locale}>
                      <Flag name={localeFlags[locale] || locale} />
                      {locale}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </FormattedMessage>

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
              {isFunction(onClickLogout) && (
                <Menu.Item>
                  <Button color="red" onClick={onClickLogout}>
                    <Icon name="sign out" fitted />
                  </Button>
                </Menu.Item>
              )}
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
  onClickLogout: PropTypes.func,
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

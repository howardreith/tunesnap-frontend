/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Box,
} from '@material-ui/core';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { withUserContext } from './UserContextProvider';

class GlobalNav extends Component {
  constructor(props) {
    super(props);

    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleUserSettingsClick = this.handleUserSettingsClick.bind(this);

    this.state = { };
  }

  handleBackClick() {
    const { history } = this.props;
    history.goBack();
  }

  handleLogInClick() {
    const { history } = this.props;
    history.push('/login');
  }

  handleSignUpClick() {
    const { history } = this.props;
    history.push('/register');
  }

  handleHomeClick() {
    const { history } = this.props;
    history.push('/');
  }

  handleUserSettingsClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { userContext } = this.props;
    const { token } = userContext;
    return (
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" width="100%">
            <Box margin={1}>
              <Button type="button" variant="contained" onClick={this.handleHomeClick}>Home</Button>
            </Box>
            <Box margin={1}>
              <Button type="button" variant="contained" onClick={this.handleBackClick}>Back</Button>
            </Box>
            { !token && (
            <>
              <Box marginLeft="auto" margin={1}>
                <Button type="button" variant="contained" onClick={this.handleLogInClick}>Sign In</Button>
              </Box>
              <Box margin={1}>
                <Button type="button" variant="contained" onClick={this.handleSignUpClick}>Sign Up</Button>
              </Box>
            </>
            )}
            { token && (
              <>
                <Box marginLeft="auto" margin={1}>
                  <Button type="button" variant="contained" onClick={this.handleUserSettingsClick}>Settings</Button>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withUserContext(GlobalNav));

GlobalNav.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

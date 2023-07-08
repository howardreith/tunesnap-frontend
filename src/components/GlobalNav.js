/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  AppBar, Toolbar, Button, Box,
} from '@mui/material';
import withRouter from '../utils/withRouter';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { withUserContext } from './User/UserContextProvider';

class GlobalNav extends Component {
  constructor(props) {
    super(props);

    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleUserSettingsClick = this.handleUserSettingsClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleGoToTableClick = this.handleGoToTableClick.bind(this);
    this.handleGoToMusicianPage = this.handleGoToMusicianPage.bind(this);

    this.state = { };
  }

  handleLogInClick() {
    const { history } = this.props;
    const { navigate } = history;
    navigate('/login');
  }

  handleSignUpClick() {
    const { history } = this.props;
    const { navigate } = history;
    navigate('/register');
  }

  handleUserSettingsClick() {
    const { history } = this.props;
    const { navigate } = history;
    navigate('/settings');
  }

  handleCartClick() {
    const { history } = this.props;
    const { navigate } = history;
    navigate('/cart');
  }

  handleLogoutClick() {
    const { history, userContext } = this.props;
    const { clearUserContextAndDestroyToken } = userContext;
    const { navigate } = history;
    clearUserContextAndDestroyToken();
    navigate('/logout');
  }

  handleGoToTableClick() {
    const { history } = this.props;
    history.navigate('/songs');
  }

  handleGoToMusicianPage() {
    const { history } = this.props;
    history.navigate('/musician');
  }

  render() {
    const token = localStorage.getItem('authToken');
    const { history } = this.props;
    const { location } = history;
    const { pathname } = location;
    return (
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" width="100%">
            { pathname !== '/songs' && (
              <Box margin={1}>
                <Button
                  onClick={this.handleGoToTableClick}
                  variant="contained"
                >
                  Search
                </Button>
              </Box>
            )}
            { !pathname.includes('musician') && (
              <Box margin={1}>
                <Button
                  onClick={this.handleGoToMusicianPage}
                  variant="contained"
                >
                  Musician Dashboard
                </Button>
              </Box>
            )}
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
                <Box margin={1}>
                  <Button type="button" variant="contained" onClick={this.handleCartClick}>Cart</Button>
                </Box>
                <Box margin={1}>
                  <Button type="button" variant="contained" onClick={this.handleLogoutClick}>Log Out</Button>
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

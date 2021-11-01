/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, Button,
} from '@material-ui/core';
import { HistoryPropType } from '../utils/propTypes';

class GlobalNav extends Component {
  constructor(props) {
    super(props);

    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);

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

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Button type="button" variant="contained" onClick={this.handleHomeClick}>Home</Button>
          <Button type="button" variant="contained" onClick={this.handleBackClick}>Back</Button>
          <Button type="button" variant="contained" onClick={this.handleLogInClick}>Sign In</Button>
          <Button type="button" variant="contained" onClick={this.handleSignUpClick}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(GlobalNav);

GlobalNav.propTypes = {
  history: HistoryPropType.isRequired,
};

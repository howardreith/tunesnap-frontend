/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@mui/material';
import withRouter from '../utils/withRouter';
import { HistoryPropType } from '../utils/propTypes';
import { register } from '../utils/backend';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '', password: '', confirmPassword: '', displayName: '',
    };
  }

  handleEmailChange(e) {
    const { value } = e.target;
    this.setState({ email: value });
  }

  handlePasswordChange(e) {
    const { value } = e.target;
    this.setState({ password: value });
  }

  handleConfirmPasswordChange(e) {
    const { value } = e.target;
    this.setState({ confirmPassword: value });
  }

  handleDisplayNameChange(e) {
    const { value } = e.target;
    this.setState({ displayName: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      email, password, confirmPassword, displayName,
    } = this.state;
    if (!email) {
      console.error('Email required');
      return;
    }
    if (!displayName) {
      console.error('User Name Required');
      return;
    }
    if (!password) {
      console.error('Password required');
      return;
    }
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    const { history } = this.props;
    register(email, password, displayName)
      .then(() => {
        history.navigate('/login');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error signing up: ', error);
      });
  }

  render() {
    const {
      email, password, confirmPassword, displayName,
    } = this.state;
    return (
      <Box>
        <Typography variant="h1">Sign Up</Typography>
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <FormControl>
            <TextField
              id="registerEmailInput"
              type="text"
              name="email"
              label="Email"
              value={email}
              onChange={this.handleEmailChange}
            />
            <TextField
              id="registerPasswordInput"
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={this.handlePasswordChange}
            />
            <TextField
              id="registerConfirmPasswordInput"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={this.handleConfirmPasswordChange}
            />
            <TextField
              id="registerDisplayNameInput"
              type="text"
              name="displayName"
              label="User Name"
              value={displayName}
              onChange={this.handleDisplayNameChange}
            />
            <Box margin={1}>
              <Button id="loginSubmitButton" type="submit" variant="contained">Submit</Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withRouter(Register);

Register.propTypes = {
  history: HistoryPropType.isRequired,
};

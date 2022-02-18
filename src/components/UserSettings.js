/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { updatePassword } from '../utils/backend';
import { withUserContext } from './UserContextProvider';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmNewPasswordChange = this.handleConfirmNewPasswordChange.bind(this);
    this.handleChangePasswordSubmit = this.handleChangePasswordSubmit.bind(this);

    this.state = {
      newPassword: '', confirmNewPassword: '',
    };
  }

  handleNewPasswordChange(e) {
    const { value } = e.target;
    this.setState({ newPassword: value });
  }

  handleConfirmNewPasswordChange(e) {
    const { value } = e.target;
    this.setState({ confirmNewPassword: value });
  }

  async handleChangePasswordSubmit(e) {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = this.state;
    if (!newPassword) {
      console.error('New Password required');
      return;
    }
    if (!confirmNewPassword) {
      console.error('Confirm New Password required');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      console.error('New passwords do not match');
      return;
    }
    const token = localStorage.getItem('authToken');
    updatePassword(newPassword, token)
      .then(() => {
        console.info('Password Updated!');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error updating password: ', error);
      });
  }

  render() {
    const { history } = this.props;
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.push('/login');
    }
    const {
      newPassword, confirmNewPassword,
    } = this.state;
    return (
      <Box>
        <Typography variant="h1">Settings</Typography>
        <Typography variant="h3">Change Password</Typography>
        <form id="changePasswordForm" onSubmit={this.handleChangePasswordSubmit}>
          <FormControl>
            <TextField
              id="changePasswordNewPasswordInput"
              type="password"
              name="newPassword"
              label="New Password"
              value={newPassword}
              onChange={this.handleNewPasswordChange}
            />
            <TextField
              id="changePasswordConfirmNewPasswordInput"
              type="password"
              name="confirmNewPassword"
              label="Confirm New Password"
              value={confirmNewPassword}
              onChange={this.handleConfirmNewPasswordChange}
            />
            <Box margin={1}>
              <Button id="updatePasswordSubmitButton" type="submit" variant="contained">Update Password</Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withRouter(withUserContext(UserSettings));

UserSettings.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

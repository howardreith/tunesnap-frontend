/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { login } from '../utils/backend';
import { withUserContext } from './UserContextProvider';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '', password: '',
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

  async handleSubmit(e) {
    const { email, password } = this.state;
    const { userContext, history } = this.props;
    e.preventDefault();
    login(email, password)
      .then((res) => {
        const {
          email: responseEmail,
          token,
          displayName,
          accompanimentSubmissions,
          favoriteSongs,
          favoriteAccompaniments,
          cart,
          accompanimentsOwned,
        } = res.data;
        userContext.setUserInfo({
          email: responseEmail,
          token,
          displayName,
          accompanimentSubmissions,
          favoriteSongs,
          favoriteAccompaniments,
          cart,
          accompanimentsOwned,
        });
        if (history.action !== 'POP') {
          history.goBack();
        } else {
          history.push('/');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error signing in: ', error);
      });
  }

  render() {
    const {
      email, password,
    } = this.state;
    return (
      <Box>
        <Typography variant="h1">Log In</Typography>
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <FormControl>
            <TextField
              id="signInEmailInput"
              type="text"
              name="email"
              label="Email"
              value={email}
              onChange={this.handleEmailChange}
            />
            <TextField
              id="signInPasswordInput"
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={this.handlePasswordChange}
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

export default withRouter(withUserContext(Login));

Login.propTypes = {
  userContext: UserContextPropType.isRequired,
  history: HistoryPropType.isRequired,
};

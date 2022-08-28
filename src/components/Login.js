import React, { Component } from 'react';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@mui/material';
import withRouter from '../utils/withRouter';
import { ErrorContextPropType, HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { login } from '../utils/backend';
import { withUserContext } from './UserContextProvider';
import { withErrorContext } from './ErrorHandler';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setError = this.setError.bind(this);

    this.state = {
      email: '', password: '', error: '',
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
    const { userContext, history, errorContext } = this.props;
    const { setError } = errorContext;
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
        localStorage.setItem('authToken', token);
        userContext.setUserInfo({
          email: responseEmail,
          displayName,
          accompanimentSubmissions,
          favoriteSongs,
          favoriteAccompaniments,
          cart,
          accompanimentsOwned,
        });
        const relevantLocations = history.locationsArray.filter((loc) => loc !== '/login');
        if (relevantLocations.length !== 0) {
          history.navigate(relevantLocations[relevantLocations.length - 1]);
        } else {
          history.navigate('/');
        }
      })
      .catch((error) => {
        setError(`${error.message}`);
      });
  }

  setError(error) {
    this.setState((state) => ({ ...state, error }));
  }

  render() {
    const { email, password } = this.state;
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

export default withRouter(withErrorContext(withUserContext(Login)));

Login.propTypes = {
  userContext: UserContextPropType.isRequired,
  history: HistoryPropType.isRequired,
  errorContext: ErrorContextPropType.isRequired,
};

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box, Typography, Button, FormControl, TextField,
} from '@material-ui/core';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { withUserContext } from './UserContextProvider';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleAddressOneChange = this.handleAddressOneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { fullName: '', addressOne: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleFullNameChange(e) {
    const { value } = e.target;
    this.setState({ fullName: value });
  }

  handleAddressOneChange(e) {
    const { value } = e.target;
    this.setState({ addressOne: value });
  }

  render() {
    const { history } = this.props;
    const token = localStorage.getItem('authToken');
    const { fullName, addressOne } = this.state;
    if (!token) {
      history.push('/login');
    }
    return (
      <Box>
        <Typography variant="h1">Checkout</Typography>
        <form id="checkoutForm" onSubmit={this.handleSubmit}>
          <FormControl>
            <TextField
              id="fullNameInput"
              type="text"
              name="fullName"
              label="Fill Name"
              value={fullName}
              onChange={this.handleFullNameChange}
            />
            <TextField
              id="addressOneInput"
              type="text"
              name="addressOne"
              label="Address Line 1"
              value={addressOne}
              onChange={this.handleAddressOneChange}
            />
            <Box margin={1}>
              <Button id="purchaseButton" type="submit" variant="contained">Submit</Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default withRouter(withUserContext(Checkout));

Checkout.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button,
} from '@material-ui/core';
import { getCart, removeAccompanimentFromCart } from '../utils/backend';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import { withUserContext } from './UserContextProvider';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.removeAccompanimentFromCart = this.removeAccompanimentFromCart.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);

    this.state = { cartContents: [] };
  }

  async componentDidMount() {
    const { userContext } = this.props;
    const { token } = userContext;
    const cartContents = (await getCart(token)).data;
    this.setState({ cartContents });
  }

  async removeAccompanimentFromCart(accompanimentId) {
    const { userContext } = this.props;
    const { token, setCart } = userContext;
    const cartContents = (await removeAccompanimentFromCart(accompanimentId, token)).data;
    this.setState({ cartContents });
    const justTheIds = cartContents.map((accomp) => accomp._id);
    setCart(justTheIds);
  }

  handleCheckout() {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    // TODO check in on why accompaniments count keeps going up
    const { history, userContext } = this.props;
    const { token } = userContext;
    if (!token) {
      history.push('/login');
    }
    const { cartContents } = this.state;
    let total = 0;
    return (
      <Box>
        <Typography variant="h1">Your Cart</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Composer</TableCell>
              <TableCell>Song Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Accompaniment File Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartContents.map((accomp) => {
              total += accomp.price;
              return (
                <TableRow key={`cartrow-${accomp._id}`}>
                  <TableCell key={`cartrow-${accomp._id}-composer`}>{accomp.song.composer}</TableCell>
                  <TableCell key={`cartrow-${accomp._id}-songTitle`}>{accomp.song.title}</TableCell>
                  <TableCell key={`cartow-${accomp._id}-artist`}>{accomp.artist}</TableCell>
                  <TableCell key={`cartow-${accomp._id}-filename`}>
                    <Link
                      to={`/accompaniments/${accomp._id}`}
                    >
                      {`${accomp.song.title}-${accomp.artist}.${accomp.file.originalFilename.split('.')[1]}`}
                    </Link>
                  </TableCell>
                  <TableCell key={`cartrow${accomp._id}-price`}>{accomp.price}</TableCell>
                  <TableCell key={`cartrow${accomp._id}-removeButton`}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => this.removeAccompanimentFromCart(accomp._id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Typography variant="h5">{`Total: $${total}`}</Typography>
        <Button type="button" variant="contained" onClick={this.handleCheckout}>Checkout</Button>
      </Box>
    );
  }
}

export default withRouter(withUserContext(Cart));

Cart.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

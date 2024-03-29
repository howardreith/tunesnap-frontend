/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button,
} from '@mui/material';
import { createSale, getCart, removeAccompanimentFromCart } from '../../utils/backend';
import { HistoryPropType, UserContextPropType } from '../../utils/propTypes';
import { withUserContext } from './UserContextProvider';
import withRouter from '../../utils/withRouter';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.removeAccompanimentFromCart = this.removeAccompanimentFromCart.bind(this);

    this.state = { cartContents: [], saleId: null };
  }

  async componentDidMount() {
    const token = localStorage.getItem('authToken');
    const { data: cartContents } = await getCart(token);
    this.setState({ cartContents });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async handleFinalizeSale() {
    const token = localStorage.getItem('authToken');
    const { cartContents } = this.state;
    const saleDetails = {
      accompanimentsSold: cartContents.map((accomp) => ({ id: accomp._id, pricePaid: accomp.price })),
    };

    createSale(saleDetails, token).then((saleSuccessRes) => {
      const { userContext: { updateAccompanimentsOwnedAndCart } } = this.props;
      const { data: { accompanimentsOwned, saleId } } = saleSuccessRes;
      updateAccompanimentsOwnedAndCart({ cart: [], accompanimentsOwned });
      this.setState({ cartContents: [], saleId });
    });
  }

  async removeAccompanimentFromCart(accompanimentId) {
    const { userContext: { setCart } } = this.props;
    const token = localStorage.getItem('authToken');
    const cartContents = (await removeAccompanimentFromCart(accompanimentId, token)).data;
    this.setState({ cartContents });
    const justTheIds = cartContents.map((accomp) => accomp._id);
    setCart(justTheIds);
  }

  render() {
    // TODO check in on why accompaniments count keeps going up
    const { history } = this.props;
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.navigate('/login');
    }

    const { cartContents, saleId } = this.state;

    if (saleId) {
      return (
        <Box>
          <Typography variant="h2">Thank You!</Typography>
          <Typography variant="h2">{`Your Order ID is ${saleId}`}</Typography>
        </Box>
      );
    }

    const total = cartContents && cartContents.reduce((acc, curr) => curr.price, 0);
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
            {cartContents.map((accomp) => (
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
            ))}
          </TableBody>
        </Table>
        <Typography variant="h5">{`Total: $${total}`}</Typography>
      </Box>
    );
  }
}

export default withRouter(withUserContext(Cart));

Cart.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

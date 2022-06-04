import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button,
} from '@mui/material';
import { getSongAtId } from '../utils/backend';
import { HistoryPropType, UserContextPropType } from '../utils/propTypes';
import AddAccompanimentForm from './AddAccompanimentForm';
import { withUserContext } from './UserContextProvider';
import withRouter from '../utils/withRouter';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchSongData = this.fetchSongData.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.handleToggleAddAccompanimentForm = this.handleToggleAddAccompanimentForm.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);

    this.state = { song: null, showAddAccompanimentForm: false };
  }

  async componentDidMount() {
    this._isMounted = true;
    const { history } = this.props;
    const { id } = history.params;
    try {
      await this.fetchSongData();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Song at ${id} not found`);
      history.navigate('/');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleToggleAddAccompanimentForm() {
    const { history } = this.props;
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.navigate('/login');
    } else {
      this.setState((state) => ({ ...state, showAddAccompanimentForm: !state.showAddAccompanimentForm }));
    }
  }

  handleAddToCart(e, id) {
    const { userContext, history } = this.props;
    const token = localStorage.getItem('authToken');
    const { addAccompanimentToCart } = userContext;
    if (!token) {
      history.navigate('/login');
    } else {
      addAccompanimentToCart(id);
    }
  }

  updateSong(song) {
    if (this._isMounted) {
      this.setState({ song });
    }
  }

  async fetchSongData() {
    const { history } = this.props;
    const { id } = history.params;
    const song = (await getSongAtId(id)).data;
    this.updateSong(song);
  }

  render() {
    const { song, showAddAccompanimentForm } = this.state;
    const { userContext } = this.props;
    const { cart, accompanimentsOwned } = userContext;
    const token = localStorage.getItem('authToken');
    const accompanimentsOwnedIds = accompanimentsOwned.map((acc) => acc.accompaniment);
    const frontEndUrl = process.env.REACT_APP_FRONTEND_URL;
    if (!song) {
      return <div><span>Loading...</span></div>;
    }
    const {
      _id, title, composer, opusNumber, lyricist, fach, songCycle, role, textAndTranslation, accompaniments,
    } = song;
    return (
      <Box>
        <Typography variant="h1">{title}</Typography>
        {songCycle && <Typography variant="h3">{`From ${songCycle}`}</Typography>}
        <Typography variant="h3">
          {`Music by ${composer}`}
        </Typography>
        {opusNumber && <Typography variant="h5">{opusNumber}</Typography>}
        {lyricist && <Typography variant="h3">{`Lyrics by ${lyricist}`}</Typography>}
        {role && fach && <Typography variant="h5">{`Role: ${role} - ${fach}`}</Typography>}
        <Typography variant="h5">
          <a
            target="_blank"
            href={textAndTranslation}
            rel="noopener noreferrer"
          >
            Text/Translation
          </a>
        </Typography>
        {showAddAccompanimentForm && <AddAccompanimentForm songId={_id} onUpdateSong={this.updateSong} />}
        <Box margin={1}>
          <Button
            variant="contained"
            onClick={this.handleToggleAddAccompanimentForm}
          >
            {showAddAccompanimentForm ? 'Hide Form' : 'Add New Accompaniment'}
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              {token && <TableCell>Your Rating</TableCell>}
              <TableCell>Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accompaniments && accompaniments.filter((accomp) => accomp)
              .map((accomp, i) => {
                const accompanimentIsLocal = !accomp.url;
                const accompanimentCostsMoney = accomp.price > 0;
                const accompanimentIsInCart = cart.includes(accomp._id);
                const accompanimentAlreadyOwned = accompanimentsOwnedIds.includes(accomp._id);
                return (
                  <TableRow key={`${accomp._id}-tr`}>
                    <TableCell key={`${accomp._id}-index}`}>{i}</TableCell>
                    <TableCell key={`${accomp._id}-logo}`}>TBD</TableCell>
                    <TableCell key={`${accomp._id}-artist}`}>{accomp.artist}</TableCell>
                    <TableCell key={`${accomp._id}-key}`}>{accomp.key}</TableCell>
                    <TableCell key={`${accomp._id}-url}`}>
                      {!accompanimentIsLocal && (
                      <a
                        target="_blank"
                        href={accomp.url}
                        rel="noopener noreferrer"
                      >
                        {accomp.url}
                      </a>
                      )}
                      {accompanimentIsLocal && (
                      <Link
                        to={`/accompaniments/${accomp._id}`}
                      >
                        {`${frontEndUrl}/accompaniments/${accomp._id}`}
                      </Link>
                      )}
                    </TableCell>
                    <TableCell key={`${accomp._id}-price}`}>{accomp.price === '0' ? 'Free' : accomp.price}</TableCell>
                    <TableCell key={`${accomp._id}-avgRating}`}>TBD</TableCell>
                    {token && <TableCell key={`${accomp._id}-userRating}`}>TBD</TableCell>}
                    <TableCell key={`${accomp._id}-addToCart`}>
                      {accompanimentIsLocal && accompanimentCostsMoney && accompanimentIsInCart
                      && (
                      <Typography variant="body1">
                        Already in cart
                      </Typography>
                      )}
                      {accompanimentIsLocal && accompanimentCostsMoney && accompanimentAlreadyOwned
                      && (
                        <Typography variant="body1">
                          You own this
                        </Typography>
                      )}
                      {accompanimentIsLocal
                      && accompanimentCostsMoney
                      && !accompanimentIsInCart
                      && !accompanimentAlreadyOwned
                      && (
                      <Button
                        id={`${accomp._id}-addToCartButton`}
                        variant="contained"
                        onClick={(e) => this.handleAddToCart(e, accomp._id)}
                      >
                        Add to Cart
                      </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default withRouter(withUserContext(SongDetails));

SongDetails.propTypes = {
  history: HistoryPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

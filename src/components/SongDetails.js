/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button,
} from '@material-ui/core';
import { getSongAtId } from '../utils/backend';
import { HistoryPropType, MatchPropType, UserContextPropType } from '../utils/propTypes';
import AddAccompanimentForm from './AddAccompanimentForm';
import { withUserContext } from './UserContextProvider';

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
    const { match, history } = this.props;
    const { params } = match;
    const { id } = params;
    try {
      await this.fetchSongData();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Song at ${id} not found`);
      history.push('/');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleToggleAddAccompanimentForm() {
    const { userContext, history } = this.props;
    const { token } = userContext;
    if (!token) {
      history.push('/login');
    } else {
      this.setState((state) => ({ ...state, showAddAccompanimentForm: !state.showAddAccompanimentForm }));
    }
  }

  async fetchSongData() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const song = (await getSongAtId(id)).data;
    this.updateSong(song);
  }

  updateSong(song) {
    if (this._isMounted) {
      this.setState({ song });
    }
  }

  handleAddToCart(e, id) {
    const { userContext, history } = this.props;
    const { token, addAccompanimentToCart } = userContext;
    if (!token) {
      history.push('/login');
    } else {
      addAccompanimentToCart(id);
    }
  }

  render() {
    const { song, showAddAccompanimentForm } = this.state;
    const { userContext } = this.props;
    const { token, cart, accompanimentsOwned } = userContext;
    const accompanimentsOwnedIds = accompanimentsOwned.map((acc) => acc.accompaniment);
    const frontEndUrl = process.env.REACT_APP_FRONTEND_URL;
    if (!song) {
      return <div><span>Loading...</span></div>;
    }
    return (
      <Box>
        <Typography variant="h1">{song.title}</Typography>
        <Typography variant="h3">
          {`Music by ${song.composer}`}
        </Typography>
        <Typography variant="h5">{song.opusNumber}</Typography>
        <Typography variant="h3">{`Lyrics by ${song.lyricist}`}</Typography>
        <Typography variant="h5">
          <a
            target="_blank"
            href={song.textAndTranslation}
            rel="noopener noreferrer"
          >
            Translations available at Lieder.net
          </a>
        </Typography>
        {showAddAccompanimentForm && <AddAccompanimentForm songId={song._id} onUpdateSong={this.updateSong} />}
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
            {song.accompaniments && song.accompaniments.filter((accomp) => accomp)
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
  match: MatchPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

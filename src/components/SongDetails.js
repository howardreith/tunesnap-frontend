/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, Typography, Button,
} from '@material-ui/core';
import { getSongAtId } from '../utils/backend';
import { HistoryPropType, MatchPropType } from '../utils/propTypes';
import AddAccompanimentForm from './AddAccompanimentForm';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchSongData = this.fetchSongData.bind(this);
    this.updateSong = this.updateSong.bind(this);
    this.handleToggleAddAccompanimentForm = this.handleToggleAddAccompanimentForm.bind(this);

    this.state = { song: null, showAddAccompanimentForm: false };
  }

  async componentDidMount() {
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

  async fetchSongData() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const song = (await getSongAtId(id)).data;
    this.updateSong(song);
  }

  updateSong(song) {
    this.setState({ song });
  }

  handleToggleAddAccompanimentForm() {
    this.setState((state) => ({ ...state, showAddAccompanimentForm: !state.showAddAccompanimentForm }));
  }

  render() {
    const { song, showAddAccompanimentForm } = this.state;
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
            rel="noreferrer"
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
              <TableCell>Your Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {song.accompaniments && song.accompaniments.filter((accomp) => accomp)
              .map((accomp, i) => (
                <TableRow key={`${accomp._id}-tr`}>
                  <TableCell key={`${accomp._id}-index}`}>{i}</TableCell>
                  <TableCell key={`${accomp._id}-logo}`}>TBD</TableCell>
                  <TableCell key={`${accomp._id}-artist}`}>{accomp.artist}</TableCell>
                  <TableCell key={`${accomp._id}-key}`}>{accomp.key}</TableCell>
                  <TableCell key={`${accomp._id}-url}`}>
                    <a target="_blank" href={accomp.url} rel="noreferrer">{accomp.url}</a>
                  </TableCell>
                  <TableCell key={`${accomp._id}-price}`}>{accomp.price}</TableCell>
                  <TableCell key={`${accomp._id}-avgRating}`}>TBD</TableCell>
                  <TableCell key={`${accomp._id}-userRating}`}>TBD</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

export default withRouter(SongDetails);

SongDetails.propTypes = {
  history: HistoryPropType.isRequired,
  match: MatchPropType.isRequired,
};

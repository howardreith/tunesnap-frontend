/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createSong, getSongAtId } from '../utils/backend';
import { HistoryPropType, MatchPropType } from '../utils/propTypes';
import AddAccompanimentForm from './AddAccompanimentForm';

class SongDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchSongData = this.fetchSongData.bind(this);
    this.updateSong = this.updateSong.bind(this);

    this.state = { song: null };
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

  async updateSong(song) {
    this.setState({ song });
  }

  render() {
    const { song } = this.state;
    if (!song) {
      return <div><span>Loading...</span></div>;
    }
    return (
      <div>
        <h1>{song.title}</h1>
        <h2>{song.composer}</h2>
        <AddAccompanimentForm songId={song._id} onUpdateSong={this.updateSong} />
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Logo</th>
              <th>Artist</th>
              <th>Key</th>
              <th>Link</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Your Rating</th>
            </tr>
          </thead>
          <tbody>
            {song.accompaniments
          && song.accompaniments.filter((accomp) => accomp)
            .map((accomp, i) => (
              <tr key={`${accomp._id}-tr`}>
                <td key={`${accomp._id}-index}`}>{i}</td>
                <td key={`${accomp._id}-logo}`}>TBD</td>
                <td key={`${accomp._id}-artist}`}>{accomp.artist}</td>
                <td key={`${accomp._id}-key}`}>{accomp.key}</td>
                <td key={`${accomp._id}-url}`}>
                  <a target="_blank" href={accomp.url} rel="noreferrer">{accomp.url}</a>
                </td>
                <td key={`${accomp._id}-price}`}>{accomp.price}</td>
                <td key={`${accomp._id}-avgRating}`}>TBD</td>
                <td key={`${accomp._id}-userRating}`}>TBD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(SongDetails);

SongDetails.propTypes = {
  history: HistoryPropType.isRequired,
  match: MatchPropType.isRequired,
};

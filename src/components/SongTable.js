/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getSongs } from '../utils/backend';
import { HistoryPropType } from '../utils/propTypes';

class SongTable extends Component {
  constructor(props) {
    super(props);

    this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);

    this.state = { songs: [] };
  }

  async componentDidMount() {
    const songs = (await getSongs()).data;
    this.setState({ songs });
  }

  handleSeeMoreClick(e) {
    const { history } = this.props;
    const { push } = history;
    const songId = e.target.id.replace('Button', '');
    push(`/songs/${songId}`);
  }

  render() {
    const { songs } = this.state;
    return (
      <div>
        <h1>Songs</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Composer</th>
              <th>See More</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={`${song._id}-tr`}>
                <td key={`${song._id}-title}`}>{song.title}</td>
                <td key={`${song._id}-composer}`}>{song.composer}</td>
                <td key={`${song._id}-seeMore`}>
                  <button type="button" id={`${song._id}Button`} onClick={this.handleSeeMoreClick}>
                    See More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(SongTable);

SongTable.propTypes = {
  history: HistoryPropType.isRequired,
};

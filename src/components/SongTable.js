/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { getSongs } from '../utils/backend';

class SongTable extends Component {
  constructor(props) {
    super(props);

    this.fetchAllSongs = this.fetchAllSongs.bind(this);
    this.state = { songs: {} };
  }

  async fetchAllSongs() {
    const songs = await getSongs();
    console.log('===> songs', songs);
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.fetchAllSongs}>Get songs</button>
      </div>
    );
  }
}

export default SongTable;

SongTable.propTypes = {};

/* eslint-disable react/no-array-index-key,class-methods-use-this */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { getSongTitles, seedDb, pruneSongs } from '../utils/backend';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleSeedDb = this.handleSeedDb.bind(this);
    this.getSongTitles = this.getSongTitles.bind(this);

    this.state = {};
  }

  async handleSeedDb() {
    await seedDb();
  }

  async handlePruneSongs() {
    await pruneSongs();
  }

  async getSongTitles() {
    await getSongTitles();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSeedDb} type="button">Seed DB</button>
        <br />
        <button type="button" onClick={this.getSongTitles}>Get Song Titles</button>
        <br />
        <button type="button" onClick={this.handlePruneSongs}>Prune Songs</button>
      </div>
    );
  }
}

export default Admin;

Admin.propTypes = {};

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { seedDb } from '../utils/backend';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleSeedDb = this.handleSeedDb.bind(this);

    this.state = {};
  }

  async handleSeedDb() {
    await seedDb();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSeedDb} type="button">Seed DB</button>
      </div>
    );
  }
}

export default Admin;

Admin.propTypes = {};

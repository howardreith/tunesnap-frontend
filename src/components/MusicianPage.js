import React, { Component } from 'react';
import { Box } from '@mui/material';

class MusicianPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {

  }

  render() {
    return <Box data-testid="musicianPage">Musician Page</Box>;
  }
}

export default MusicianPage;

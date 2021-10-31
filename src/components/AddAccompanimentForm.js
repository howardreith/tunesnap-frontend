/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@material-ui/core';
import { addAccompaniment } from '../utils/backend';

class AddAccompanimentForm extends Component {
  constructor(props) {
    super(props);

    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      url: '', artist: '', price: '', key: '',
    };
  }

  handleLinkChange(e) {
    const { value } = e.target;
    this.setState({ url: value });
  }

  handleArtistChange(e) {
    const { value } = e.target;
    this.setState({ artist: value });
  }

  handlePriceChange(e) {
    const { value } = e.target;
    this.setState({ price: value });
  }

  handleKeyChange(e) {
    const { value } = e.target;
    this.setState({ key: value });
  }

  async handleSubmit(e) {
    const {
      url, artist, price, key,
    } = this.state;
    const { songId, onUpdateSong } = this.props;
    e.preventDefault();
    const accompaniment = {
      url, artist, price, key, songId,
    };
    addAccompaniment(accompaniment)
      .then((res) => {
        onUpdateSong(res.data);
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.error('Error creating accompaniment: ', error);
      });
  }

  render() {
    const {
      url, artist, price, key,
    } = this.state;
    return (
      <Box sx={{ border: '1px solid black', width: '60%', margin: 'auto' }} marginTop={1} marginBottom={1}>
        <Typography variant="h4">Add Accompaniment</Typography>
        <form id="addAccompanimentForm" onSubmit={this.handleSubmit}>
          <FormControl>
            <TextField
              id="urlInput"
              type="text"
              name="url"
              label="Link"
              value={url}
              onChange={this.handleLinkChange}
            />
            <TextField
              id="artistInput"
              type="text"
              name="artist"
              label="Artist"
              value={artist}
              onChange={this.handleArtistChange}
            />
            <TextField
              id="priceInput"
              type="text"
              name="price"
              label="Price"
              value={price}
              onChange={this.handlePriceChange}
            />
            <TextField id="keyInput" type="text" name="key" label="Key" value={key} onChange={this.handleKeyChange} />
            <Box margin={1}>
              <Button id="addAccompanimentFormSubmitButton" type="submit" variant="contained">Submit</Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    );
  }
}

export default AddAccompanimentForm;

AddAccompanimentForm.propTypes = {
  songId: PropTypes.string.isRequired,
  onUpdateSong: PropTypes.func.isRequired,
};

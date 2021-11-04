/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import {
  Typography, Box, FormControl, Button, TextField,
} from '@material-ui/core';
import { addAccompaniment } from '../utils/backend';
import { withUserContext } from './UserContextProvider';
import { UserContextPropType } from '../utils/propTypes';

const FORM_OPTIONS = {
  LINK_FORM: 'linkForm',
  UPLOAD_FORM: 'uploadForm',
};

class AddAccompanimentForm extends Component {
  constructor(props) {
    super(props);

    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleArtistChange = this.handleArtistChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShareLinkClick = this.handleShareLinkClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);

    this.state = {
      url: '', artist: '', price: '', key: '', file: '', formChosen: null,
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

  handleFileChange(e) {
    const file = e.target.files[0];
    if (!file.type.includes('audio') || !['.mp3', '.wav', '.m4a'].some((ext) => file.name.includes(ext))) {
      throw Error('File must be mp3, wav, or m4a');
    }
    this.setState({ file });
  }

  handleShareLinkClick() {
    this.setState({ formChosen: FORM_OPTIONS.LINK_FORM });
  }

  handleUploadClick() {
    this.setState({ formChosen: FORM_OPTIONS.UPLOAD_FORM });
  }

  async handleSubmit(e) {
    const {
      url, artist, price, key, file, formChosen,
    } = this.state;
    const { songId, onUpdateSong, userContext } = this.props;
    const { token } = userContext;
    e.preventDefault();
    const data = new FormData();
    data.append('songId', songId);
    data.append('artist', artist);
    data.append('price', price);
    data.append('key', key);

    if (formChosen === FORM_OPTIONS.LINK_FORM) {
      data.append('url', url);
    }
    if (formChosen === FORM_OPTIONS.UPLOAD_FORM) {
      data.append('file', file);
    }
    addAccompaniment(data, token)
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
      url, artist, price, key, file, formChosen,
    } = this.state;
    return (
      <Box sx={{ border: '1px solid black', width: '60%', margin: 'auto' }} marginTop={1} marginBottom={1}>
        <Typography variant="h4">Add Accompaniment</Typography>

        <Box>
          <Typography variant="h4">Link or Upload?</Typography>
          <Box>
            <Button id="shareLinkButton" onClick={this.handleShareLinkClick}>Share Link</Button>
            <Button id="uploadFileButton" onClick={this.handleUploadClick}>Upload</Button>
          </Box>
        </Box>

        {formChosen && (
        <form id="addAccompanimentForm" onSubmit={this.handleSubmit}>
          <FormControl>
            {formChosen === FORM_OPTIONS.LINK_FORM && (
            <TextField
              id="urlInput"
              type="text"
              name="url"
              label="Link"
              value={url}
              onChange={this.handleLinkChange}
            />
            )}
            {formChosen === FORM_OPTIONS.UPLOAD_FORM && (
              <Box>
                {file && <Box><Typography variant="body1">{`Filename: ${file.name}`}</Typography></Box>}
                <Box>
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload File
                    <input
                      style={{ display: 'none' }}
                      id="fileInput"
                      type="file"
                      accept=".mp3,audio/*"
                      onChange={this.handleFileChange}
                    />
                  </Button>
                </Box>
              </Box>
            )}
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
        )}
      </Box>
    );
  }
}

export default withUserContext(AddAccompanimentForm);

AddAccompanimentForm.propTypes = {
  songId: PropTypes.string.isRequired,
  onUpdateSong: PropTypes.func.isRequired,
  userContext: UserContextPropType.isRequired,
};

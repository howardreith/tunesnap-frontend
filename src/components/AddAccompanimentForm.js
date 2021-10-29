/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { addAccompaniment, createSong } from '../utils/backend';

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
      <div>
        <form id="addAccompanimentForm" onSubmit={this.handleSubmit}>
          <label htmlFor="urlinput">
            Link:
            <input id="urlInput" type="text" name="url" value={url} onChange={this.handleLinkChange} />
          </label>
          <label htmlFor="artistInput">
            Artist:
            <input id="artistInput" type="text" name="artist" value={artist} onChange={this.handleArtistChange} />
          </label>
          <label htmlFor="priceInput">
            Price:
            <input id="priceInput" type="text" name="price" value={price} onChange={this.handlePriceChange} />
          </label>
          <label htmlFor="keyInput">
            Key:
            <input id="keyInput" type="text" name="key" value={key} onChange={this.handleKeyChange} />
          </label>
          <input id="addAccompanimentFormSubmitButton" type="submit" />
        </form>
      </div>
    );
  }
}

export default AddAccompanimentForm;

AddAccompanimentForm.propTypes = {
  songId: PropTypes.string.isRequired,
  onUpdateSong: PropTypes.func.isRequired,
};

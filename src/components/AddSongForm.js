/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { createSong } from '../utils/backend';

class AddSongForm extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleComposerChange = this.handleComposerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLyricistChange = this.handleLyricistChange.bind(this);
    this.handleTextAndTranslationChange = this.handleTextAndTranslationChange.bind(this);
    this.handleOpusNumberChange = this.handleOpusNumberChange.bind(this);
    this.handleSongCycleChange = this.handleSongCycleChange.bind(this);
    this.handleSongCycleIndexChange = this.handleSongCycleIndexChange.bind(this);

    this.state = {
      title: '', composer: '', lyricist: '', textAndTranslation: '', opusNumber: '', songCycle: '', songCycleIndex: '',
    };
  }

  handleTitleChange(e) {
    const { value } = e.target;
    this.setState({ title: value });
  }

  handleComposerChange(e) {
    const { value } = e.target;
    this.setState({ composer: value });
  }

  handleLyricistChange(e) {
    const { value } = e.target;
    this.setState({ lyricist: value });
  }

  handleTextAndTranslationChange(e) {
    const { value } = e.target;
    this.setState({ textAndTranslation: value });
  }

  handleOpusNumberChange(e) {
    const { value } = e.target;
    this.setState({ opusNumber: value });
  }

  handleSongCycleChange(e) {
    const { value } = e.target;
    this.setState({ songCycle: value });
  }

  handleSongCycleIndexChange(e) {
    const { value } = e.target;
    this.setState({ songCycleIndex: value });
  }

  async handleSubmit(e) {
    const {
      title, composer, lyricist, textAndTranslation, opusNumber, songCycle, songCycleIndex,
    } = this.state;
    e.preventDefault();
    const song = { title, composer, textAndTranslation };
    if (lyricist) {
      song.lyricist = lyricist;
    }
    if (opusNumber) {
      song.opusNumber = opusNumber;
    }
    if (songCycle) {
      song.songCycle = songCycle;
    }
    if (songCycleIndex) {
      song.songCycleIndex = songCycleIndex;
    }
    await createSong(song).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error creating song: ', error);
    });
  }

  render() {
    const {
      title, composer, lyricist, textAndTranslation, opusNumber, songCycle, songCycleIndex,
    } = this.state;
    return (
      <div>
        <form id="addSongForm" onSubmit={this.handleSubmit}>
          <label htmlFor="titleInput">
            Title:
            <input id="titleInput" type="text" name="title" value={title} onChange={this.handleTitleChange} />
          </label>
          <label htmlFor="composerInput">
            Composer:
            <input
              id="composerInput"
              type="text"
              name="composer"
              value={composer}
              onChange={this.handleComposerChange}
            />
          </label>
          <label htmlFor="lyricistInput">
            Lyricist:
            <input
              id="lyricistInput"
              type="text"
              name="lyricist"
              value={lyricist}
              onChange={this.handleLyricistChange}
            />
          </label>
          <label htmlFor="textAndTranslationInput">
            Text and Translation Link:
            <input
              id="textAndTranslationInput"
              type="text"
              name="textAndTranslation"
              value={textAndTranslation}
              onChange={this.handleTextAndTranslationChange}
            />
          </label>
          <label htmlFor="opusNumberInput">
            Opus Number:
            <input
              id="opusNumberInput"
              type="text"
              name="opusNumber"
              value={opusNumber}
              onChange={this.handleOpusNumberChange}
            />
          </label>

          <label htmlFor="songCycleInput">
            Song Cycle:
            <input
              id="songCycleInput"
              type="text"
              name="songCycle"
              value={songCycle}
              onChange={this.handleSongCycleChange}
            />
          </label>

          <label htmlFor="songCycleIndexInput">
            Song Cycle Index:
            <input
              id="songCycleIndexInput"
              type="text"
              name="songCycleIndex"
              value={songCycleIndex}
              onChange={this.handleSongCycleIndexChange}
            />
          </label>

          <input id="addSongFormSubmitButton" type="submit" />
        </form>
      </div>
    );
  }
}

export default AddSongForm;

AddSongForm.propTypes = {};

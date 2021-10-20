/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { createSong } from '../utils/backend';

export const StyledChatRoom = styled.div`
  margin: 3px;
  width: 99%;
  border: 1px solid black;
  height: 85vh;
  overflow-y: scroll;
`;

export const StyledMessageTextBox = styled.textarea`
  margin: 3px;
  width: 100%;
  display: flex;
  height: 30px;
`;

export const StyledSendButton = styled.input`
  width: 70px;
  height: 35px;
  margin: 3px;
`;

export const StyledMessageTextForm = styled.form`
  display: flex;
`;

export const StyledHeaderWrapper = styled.div`
  height: 60px;
  text-align: center;
`;

class AddSongForm extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleComposerChange = this.handleComposerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { title: '', composer: '' };
  }

  handleTitleChange(e) {
    const { value } = e.target;
    this.setState({ title: value });
  }

  handleComposerChange(e) {
    const { value } = e.target;
    this.setState({ composer: value });
  }

  async handleSubmit(e) {
    const { title, composer } = this.state;
    e.preventDefault();
    const song = { title, composer };
    await createSong(song).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error creating song: ', error);
    });
  }

  render() {
    const { title, composer } = this.state;
    return (
      <div>
        <form id="addSongForm" onSubmit={this.handleSubmit}>
          <label htmlFor="titleInput">
            Title:
            <input id="titleInput" type="text" name="title" value={title} onChange={this.handleTitleChange} />
          </label>
          <label htmlFor="composerInput">
            Composer:
            <input id="composerInput" type="text" name="composer" value={composer} onChange={this.handleComposerChange} />
          </label>
          <input id="addSongFormSubmitButton" type="submit" />
        </form>
      </div>
    );
  }
}

export default AddSongForm;

AddSongForm.propTypes = {};

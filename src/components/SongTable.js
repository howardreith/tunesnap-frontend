/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getSongViaAutocomplete } from '../utils/backend';
import { HistoryPropType } from '../utils/propTypes';

class SongTable extends Component {
  constructor(props) {
    super(props);

    this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);

    this.state = { songs: [], searchValue: '', page: 0 };
    this.songs = [];
  }

  handleSeeMoreClick(e) {
    const { history } = this.props;
    const { push } = history;
    const songId = e.target.id.replace('Button', '');
    push(`/songs/${songId}`);
  }

  async handleSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchValue: value });
    if (value) {
      this.songs = (await getSongViaAutocomplete(value)).data;
      this.setState({ songs: this.songs.slice(0, 20), page: 0 });
    } else {
      this.setState({ songs: [] });
    }
  }

  goToNextPage() {
    const { page } = this.state;
    const minIndex = (page + 1) * 20;
    const maxIndex = (page + 2) * 20;
    this.setState((state) => ({
      ...state,
      page: state.page + 1,
      songs: this.songs.slice(minIndex, maxIndex),
    }));
  }

  goToPreviousPage() {
    const { page } = this.state;
    const minIndex = (page - 1) * 20;
    const maxIndex = page * 20;
    this.setState((state) => ({
      ...state,
      page: state.page - 1,
      songs: this.songs.slice(minIndex, maxIndex),
    }));
  }

  render() {
    const { songs, searchValue, page } = this.state;
    return (
      <div>
        <h1>Songs</h1>
        <input onChange={this.handleSearchChange} value={searchValue} />
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
        {page > 0 && <button type="button" onClick={this.goToPreviousPage}>Previous Page</button>}
        {(page + 1) * 20 < this.songs.length && <button type="button" onClick={this.goToNextPage}>Next Page</button>}
      </div>
    );
  }
}

export default withRouter(SongTable);

SongTable.propTypes = {
  history: HistoryPropType.isRequired,
};

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination,
} from '@material-ui/core';
import { HistoryPropType } from '../utils/propTypes';
import { getSongViaAutocomplete } from '../utils/backend';

const SORT_OPTIONS = {
  TITLE: 'title',
  TITLE_REVERSE: 'titleReverse',
  COMPOSER: 'composer',
  COMPOSER_REVERSE: 'composerReverse',
  SONG_CYCLE: 'songCycle',
  SONG_CYCLE_REVERSE: 'songCycleReverse',
};

class SongTable extends Component {
  constructor(props) {
    super(props);

    this.handleSeeMoreClick = this.handleSeeMoreClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTitleSortClick = this.handleTitleSortClick.bind(this);
    this.handleComposerSortClick = this.handleComposerSortClick.bind(this);
    this.handleSongCycleSortClick = this.handleSongCycleSortClick.bind(this);
    this.updateData = this.updateData.bind(this);

    this.state = {
      songs: [], searchValue: '', page: 0, numberOfSongs: 0, sortBy: SORT_OPTIONS.TITLE,
    };
    this.timeout = 0;
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
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(async () => {
        await this.updateData();
      }, 150);
    }
  }

  async handleTitleSortClick() {
    const { sortBy } = this.state;
    if (![SORT_OPTIONS.TITLE, SORT_OPTIONS.TITLE_REVERSE].includes(sortBy)
      || sortBy === SORT_OPTIONS.TITLE_REVERSE) {
      this.setState({ sortBy: SORT_OPTIONS.TITLE }, this.updateData);
    } else {
      this.setState({ sortBy: SORT_OPTIONS.TITLE_REVERSE }, this.updateData);
    }
    await this.updateData();
  }

  async handleComposerSortClick() {
    const { sortBy } = this.state;
    if (![SORT_OPTIONS.COMPOSER, SORT_OPTIONS.COMPOSER_REVERSE].includes(sortBy)
      || sortBy === SORT_OPTIONS.COMPOSER_REVERSE) {
      this.setState({ sortBy: SORT_OPTIONS.COMPOSER }, this.updateData);
    } else {
      this.setState({ sortBy: SORT_OPTIONS.COMPOSER_REVERSE }, this.updateData);
    }
  }

  async handleSongCycleSortClick() {
    const { sortBy } = this.state;
    if (![SORT_OPTIONS.SONG_CYCLE, SORT_OPTIONS.SONG_CYCLE_REVERSE].includes(sortBy)
      || sortBy === SORT_OPTIONS.SONG_CYCLE_REVERSE) {
      this.setState({ sortBy: SORT_OPTIONS.SONG_CYCLE }, this.updateData);
    } else {
      this.setState({ sortBy: SORT_OPTIONS.SONG_CYCLE_REVERSE }, this.updateData);
    }
  }

  handlePageChange(e, page) {
    this.setState((state) => ({
      ...state,
      page,
    }), this.updateData);
  }

  async updateData() {
    const { searchValue, sortBy, page } = this.state;
    const response = (await getSongViaAutocomplete(searchValue, sortBy, page)).data;
    const { numberOfSongs, songs } = response;
    this.setState({ songs, numberOfSongs });
  }

  render() {
    const {
      songs, searchValue, page, sortBy, numberOfSongs,
    } = this.state;
    return (
      <div>
        <h1>Songs</h1>
        <input onChange={this.handleSearchChange} value={searchValue} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={this.handleTitleSortClick}>
                <TableSortLabel
                  active={[SORT_OPTIONS.TITLE, SORT_OPTIONS.TITLE_REVERSE].includes(sortBy)}
                  direction={([SORT_OPTIONS.TITLE, SORT_OPTIONS.TITLE_REVERSE].includes(sortBy)
                  && (sortBy === SORT_OPTIONS.TITLE ? 'desc' : 'asc')) || undefined}
                />
                Title
              </TableCell>
              <TableCell onClick={this.handleComposerSortClick}>
                <TableSortLabel
                  active={[SORT_OPTIONS.COMPOSER, SORT_OPTIONS.COMPOSER_REVERSE].includes(sortBy)}
                  direction={([SORT_OPTIONS.COMPOSER, SORT_OPTIONS.COMPOSER_REVERSE].includes(sortBy)
                  && (sortBy === SORT_OPTIONS.COMPOSER ? 'desc' : 'asc')) || undefined}
                />
                Composer
              </TableCell>
              <TableCell onClick={this.handleSongCycleSortClick}>
                <TableSortLabel
                  active={[SORT_OPTIONS.SONG_CYCLE, SORT_OPTIONS.SONG_CYCLE_REVERSE].includes(sortBy)}
                  direction={([SORT_OPTIONS.SONG_CYCLE, SORT_OPTIONS.SONG_CYCLE_REVERSE].includes(sortBy)
                  && (sortBy === SORT_OPTIONS.SONG_CYCLE ? 'desc' : 'asc')) || undefined}
                />
                Collection
              </TableCell>
              <TableCell>See More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => (
              <TableRow key={`${song._id}-tr`}>
                <TableCell key={`${song._id}-title}`}>{song.title}</TableCell>
                <TableCell key={`${song._id}-composer}`}>{song.composer}</TableCell>
                <TableCell key={`${song._id}-collection`}>{song.songCycle}</TableCell>
                <TableCell key={`${song._id}-seeMore`}>
                  <button type="button" id={`${song._id}Button`} onClick={this.handleSeeMoreClick}>
                    See More
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          rowsPerPage={10}
          component="div"
          count={numberOfSongs}
          page={page}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withRouter(SongTable);

SongTable.propTypes = {
  history: HistoryPropType.isRequired,
};

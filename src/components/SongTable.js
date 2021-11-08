/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, TextField, Box,
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

    this.handleSeeAccompanimentsClick = this.handleSeeAccompanimentsClick.bind(this);
    this.handleTitleSearchChange = this.handleTitleSearchChange.bind(this);
    this.handleComposerSearchChange = this.handleComposerSearchChange.bind(this);
    this.handleSongSetSearchChange = this.handleSongSetSearchChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTitleSortClick = this.handleTitleSortClick.bind(this);
    this.handleComposerSortClick = this.handleComposerSortClick.bind(this);
    this.handleSongCycleSortClick = this.handleSongCycleSortClick.bind(this);
    this.updateData = this.updateData.bind(this);

    this.state = {
      songs: [],
      titleSearchValue: '',
      composerSearchValue: '',
      songSetSearchValue: '',
      page: 0,
      numberOfSongs: 0,
      sortBy: SORT_OPTIONS.TITLE,
    };
    this.timeout = 0;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSeeAccompanimentsClick(e) {
    const { history } = this.props;
    const { push } = history;
    const songId = e.target.id.replace('Button', '').replace('Accompaniments', '');
    push(`/songs/${songId}`);
  }

  async handleTitleSearchChange(e) {
    const { value } = e.target;
    this.setState({ titleSearchValue: value }, () => {
      const { titleSearchValue, composerSearchValue } = this.state;
      if (titleSearchValue || composerSearchValue) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
          await this.updateData();
        }, 150);
      }
    });
  }

  async handleComposerSearchChange(e) {
    const { value } = e.target;
    this.setState({ composerSearchValue: value }, () => {
      const { titleSearchValue, composerSearchValue } = this.state;
      if (titleSearchValue || composerSearchValue) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
          await this.updateData();
        }, 150);
      }
    });
  }

  async handleSongSetSearchChange(e) {
    const { value } = e.target;
    this.setState({ songSetSearchValue: value }, () => {
      const { titleSearchValue, composerSearchValue, songSetSearchValue } = this.state;
      if (titleSearchValue || composerSearchValue || songSetSearchValue) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {
          await this.updateData();
        }, 150);
      }
    });
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
    const {
      titleSearchValue, composerSearchValue, songSetSearchValue, sortBy, page,
    } = this.state;
    const response = (await getSongViaAutocomplete({
      titleSearchValue, composerSearchValue, songSetSearchValue, sortBy, page,
    })).data;
    const { numberOfSongs, songs } = response;
    if (this._isMounted) {
      if (numberOfSongs < 10) {
        this.setState({ songs, numberOfSongs, page: 0 });
      } else {
        this.setState({ songs, numberOfSongs });
      }
    }
  }

  render() {
    const {
      songs, titleSearchValue, composerSearchValue, songSetSearchValue, page, sortBy, numberOfSongs,
    } = this.state;

    return (
      <div>
        <h1>Songs</h1>
        <Box display="inline-flex">
          <Box display="flex" margin={1}>
            <TextField
              variant="outlined"
              id="titleSearchInput"
              onChange={this.handleTitleSearchChange}
              value={titleSearchValue}
              label="Title"
            />
          </Box>
          <Box display="flex" margin={1}>
            <TextField
              variant="outlined"
              id="composerSearchInput"
              onChange={this.handleComposerSearchChange}
              value={composerSearchValue}
              label="Composer"
            />
          </Box>
          <Box display="flex" margin={1}>
            <TextField
              variant="outlined"
              id="songSetSearchValue"
              onChange={this.handleSongSetSearchChange}
              value={songSetSearchValue}
              label="Song Cycle / Opera"
            />
          </Box>
        </Box>
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
              <TableCell>Accompaniments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => (
              <TableRow key={`${song._id}-tr`}>
                <TableCell key={`${song._id}-title}`}>{song.title}</TableCell>
                <TableCell key={`${song._id}-composer}`}>{song.composer}</TableCell>
                <TableCell key={`${song._id}-collection`}>{song.songCycle}</TableCell>
                <TableCell key={`${song._id}-seeAccompaniments`}>
                  <button
                    type="button"
                    id={`${song._id}AccompanimentsButton`}
                    onClick={this.handleSeeAccompanimentsClick}
                  >
                    {`${song.accompaniments.length} Accompaniments`}
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
          page={numberOfSongs > 0 ? page : 0}
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

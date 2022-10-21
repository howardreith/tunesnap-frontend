import React, { Component } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getRequestedAccompaniments } from '../../utils/backend';

class MusicianPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songsSortedByNumberOfRequests: [],
      songsSortedByRecency: [],
      totalLength: null,
      sortedByNumberOfRequestsPage: 1,
      sortedByRecencyPage: 1,
    };
  }

  async componentDidMount() {
    const songsWithRequestedAccompaniments = await Promise.all([
      getRequestedAccompaniments(1, false),
      getRequestedAccompaniments(1, true),
    ]);
    const [{ data: dataSortedByNumberOfRequests },
      { data: dataSortedByRecencyOfRequests }] = songsWithRequestedAccompaniments;
    this.setState({
      songsSortedByNumberOfRequests: dataSortedByNumberOfRequests.accompanimentRequestsPage,
      totalLength: dataSortedByNumberOfRequests.totalLength,
      songsSortedByRecency: dataSortedByRecencyOfRequests.accompanimentRequestsPage,
    });
  }

  async changePage(listName, isIncrement) {
    const { sortedByNumberOfRequestsPage, sortedByRecencyPage } = this.state;
    const sortByRecency = listName !== 'numberOfRequests';
    const currentPageNumber = sortByRecency
      ? sortedByRecencyPage : sortedByNumberOfRequestsPage;
    const newPage = isIncrement ? currentPageNumber + 1 : currentPageNumber - 1;
    const { data } = await getRequestedAccompaniments(currentPageNumber, sortByRecency);
    if (sortByRecency) {
      this.setState({
        songsSortedByRecency: data.accompanimentRequestsPage,
        sortedByRecencyPage: newPage,
      });
    } else {
      this.setState({
        songsSortedByNumberOfRequests: data.accompanimentRequestsPage,
        sortedByNumberOfRequestsPage: newPage,
      });
    }
  }

  render() {
    const {
      songsSortedByNumberOfRequests, songsSortedByRecency, totalLength, sortedByNumberOfRequestsPage,
    } = this.state;
    const maxPages = Math.floor(totalLength / 10);
    return (
      <Box data-testid="musicianPage">
        <Box data-testid="requestsTablesContainer">
          <Typography variant="h2">Most Requested Songs</Typography>
          <Box data-testid="sortedByNumberOfRequestsTable" width={0.25}>
            <Typography variant="h5">By Requests All-Time</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Title
                  </TableCell>
                  <TableCell>
                    Composer
                  </TableCell>
                  <TableCell>
                    Requests
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songsSortedByNumberOfRequests.map((song) => (
                  <TableRow>
                    <TableCell>
                      <Link to={`/songs/${song._id}`}>
                        {song.title}
                      </Link>
                    </TableCell>
                    <TableCell>{song.composer}</TableCell>
                    <TableCell>{song.accompanimentRequests.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            { sortedByNumberOfRequestsPage > 1 && (
            <Button
              onClick={() => this.changePage('numberOfRequests', false)}
            >
              Prev Page
            </Button>
            )}
            { sortedByNumberOfRequestsPage < maxPages && (
            <Button
              onClick={() => this.changePage('numberOfRequests', true)}
            >
              Next Page
            </Button>
            )}
          </Box>
          <Box data-testid="sortedByRecencyTable" width={0.25}>
            <Typography variant="h5">By Recency of Requests</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Title
                  </TableCell>
                  <TableCell>
                    Composer
                  </TableCell>
                  <TableCell>
                    Requests
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {songsSortedByRecency.map((song) => (
                  <TableRow>
                    <TableCell>
                      <Link to={`/songs/${song._id}`}>
                        {song.title}
                      </Link>
                    </TableCell>
                    <TableCell>{song.composer}</TableCell>
                    <TableCell>{song.accompanimentRequests.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            { sortedByNumberOfRequestsPage > 1 && (
            <Button
              onClick={() => this.changePage('recency', false)}
            >
              Prev Page
            </Button>
            )}
            { sortedByNumberOfRequestsPage < maxPages && (
            <Button
              onClick={() => this.changePage('recency', true)}
            >
              Next Page
            </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default MusicianPage;

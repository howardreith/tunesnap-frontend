/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Box, Typography, Button,
} from '@material-ui/core';
// import { getAccompanimentAtId } from '../utils/backend';
import { HistoryPropType, MatchPropType, UserContextPropType } from '../utils/propTypes';
import { withUserContext } from './UserContextProvider';
import { getAccompanimentAtId, getAccompanimentFileAtId } from '../utils/backend';

class AccompanimentDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchAccompanimentData = this.fetchAccompanimentData.bind(this);
    this.fetchAccompanimentDownload = this.fetchAccompanimentDownload.bind(this);
    this.updateAccompaniment = this.updateAccompaniment.bind(this);
    this.downloadAccompanimentFile = this.downloadAccompanimentFile.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);

    this.state = { accompaniment: null, accompanimentFile: null };
  }

  componentDidMount() {
    this.fetchAccompanimentData();
    this.fetchAccompanimentDownload();
  }

  handleAddToCart() {
    const { userContext, history } = this.props;
    const { token, addAccompanimentToCart } = userContext;
    const { accompaniment } = this.state;
    const id = accompaniment._id;
    if (!token) {
      history.push('/login');
    } else {
      addAccompanimentToCart(id);
    }
  }

  fetchAccompanimentData() {
    const { match, userContext } = this.props;
    const { params } = match;
    const { id } = params;
    const { token } = userContext;
    getAccompanimentAtId(id, token).then((res) => {
      this.updateAccompaniment(res.data);
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Could not retrieve accompaniment data', e);
    });
  }

  fetchAccompanimentDownload() {
    const { match, userContext } = this.props;
    const { params } = match;
    const { id } = params;
    const { token } = userContext;
    getAccompanimentFileAtId(id, token)
      .then((res) => res.blob())
      .then((blob) => {
      // There is no way to directly download the blob. We must create a link to the blob and click it
        this.setState({ accompanimentFile: blob }, () => {
          const { accompanimentFile } = this.state;
          const accompanimentFileBlobUrl = URL.createObjectURL(accompanimentFile);
          this.setState({ accompanimentFileBlobUrl });
        });
      });
  }

  updateAccompaniment(accompaniment) {
    this.setState({ accompaniment });
  }

  downloadAccompanimentFile() {
    const { accompaniment, accompanimentFileBlobUrl } = this.state;
    const { song, artist } = accompaniment;
    const { title } = song;
    const link = document.createElement('a');
    link.href = accompanimentFileBlobUrl;
    link.setAttribute('download', `${title}-${artist}.mp3`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    const { accompaniment, accompanimentFile, accompanimentFileBlobUrl } = this.state;
    const { userContext } = this.props;
    if (!accompaniment) {
      return <div><span>Loading...</span></div>;
    }
    const userOwnsAccompaniment = userContext.accompanimentsOwned
      .map((acc) => acc.accompaniment).includes(accompaniment._id);
    const accompanimentIsFree = accompaniment.price === 0;
    const { cart } = userContext;
    const accompanimentIsInCart = cart.includes(accompaniment._id);
    return (
      <Box>
        <Typography variant="h1">{accompaniment.song.title}</Typography>
        <Typography variant="h3">
          {`Music by ${accompaniment.song.composer}`}
        </Typography>
        <Typography variant="h5">{accompaniment.song.opusNumber}</Typography>
        <Typography variant="h3">{`Lyrics by ${accompaniment.song.lyricist}`}</Typography>
        <Typography variant="h5">
          <a
            target="_blank"
            href={accompaniment.song.textAndTranslation}
            rel="noopener noreferrer"
          >
            Translations available at Lieder.net
          </a>
        </Typography>
        <Typography variant="h3">{`Performance by ${accompaniment.artist}`}</Typography>
        <Typography variant="h3">{`Uploaded by ${accompaniment.addedBy.displayName}`}</Typography>
        <Typography variant="h4">{`${accompaniment.key}`}</Typography>

        <Box>
          {accompanimentFileBlobUrl && (
          <Box>
            {!userOwnsAccompaniment && (
            <Box>
              <Typography variant="h5">You do not own this accompaniment. Here is a sample</Typography>
            </Box>
            )}
            <Box margin={1}>
              <audio controls="controls">
                <source src={accompanimentFileBlobUrl} type="audio/mp3" />
              </audio>
            </Box>
            {!userOwnsAccompaniment && !accompanimentIsFree && (
              <Box>
                {!accompanimentIsInCart && (
                <Button
                  type="button"
                  variant="contained"
                  onClick={this.handleAddToCart}
                >
                  Add to Cart
                </Button>
                )}
                {accompanimentIsInCart && <Typography variant="body1">Already in Cart</Typography>}
              </Box>
            )}
          </Box>
          )}
          {userOwnsAccompaniment && !accompanimentIsFree && (
          <Box margin={1}>
            <Button onClick={this.downloadAccompanimentFile} variant="contained">Download</Button>
          </Box>
          )}
        </Box>

        {!accompanimentFile && (
          <Box>
            <Typography variant="body1">Downloading Audio File...</Typography>
          </Box>
        )}
      </Box>
    );
  }
}

export default withRouter(withUserContext(AccompanimentDetails));

AccompanimentDetails.propTypes = {
  history: HistoryPropType.isRequired,
  match: MatchPropType.isRequired,
  userContext: UserContextPropType.isRequired,
};

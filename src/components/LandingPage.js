import React from 'react';
import { Box, Button } from '@mui/material';
import withRouter from '../utils/withRouter';
import { HistoryPropType } from '../utils/propTypes';

function LandingPage({ history }) {
  const handleGoToTableClick = () => {
    history.navigate('/songs');
  };

  const handleGoToMusicianPage = () => {
    history.navigate('/musician');
  };

  return (
    <Box>
      <Button onClick={handleGoToTableClick} variant="contained">Search Songs and Accompaniments</Button>
      <Button onClick={handleGoToMusicianPage} variant="contained">I am an accompanist</Button>
    </Box>
  );
}

LandingPage.propTypes = {
  history: HistoryPropType.isRequired,
};

export default withRouter(LandingPage);

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import withRouter from '../utils/withRouter';
import { HistoryPropType } from '../utils/propTypes';

function LandingPage({ history }) {
  useEffect(() => {
    history.navigate('/songs');
  });

  return null;
}

LandingPage.propTypes = {
  history: HistoryPropType.isRequired,
};

export default withRouter(LandingPage);

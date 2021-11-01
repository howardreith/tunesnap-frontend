import * as PropTypes from 'prop-types';

export const HistoryPropType = PropTypes.shape({
  push: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
});

export const MatchPropType = PropTypes.shape({
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
});

export const UserContextPropType = PropTypes.shape({
  email: PropTypes.string,
  token: PropTypes.string,
  setUserInfo: PropTypes.func.isRequired,
});

import * as PropTypes from 'prop-types';

export const HistoryPropType = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
  }).isRequired,
  params: PropTypes.shape({}).isRequired,
});

export const UserContextPropType = PropTypes.shape({
  email: PropTypes.string,
  setUserInfo: PropTypes.func.isRequired,
});

export const ErrorContextPropType = PropTypes.shape({
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
});

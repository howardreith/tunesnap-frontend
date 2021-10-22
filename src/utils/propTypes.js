import * as PropTypes from 'prop-types';

export const HistoryPropType = PropTypes.shape({
  push: PropTypes.func,
});

export const MatchPropType = PropTypes.shape({
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
});

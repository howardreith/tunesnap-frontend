import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

export const HistoryContext = React.createContext();

export function RouterProvider(props) {
  const [locationsArray, setLocationsArray] = useState([]);
  const location = useLocation();
  const trueNavigate = useNavigate();
  const params = useParams();

  const navigate = (route) => {
    const newLocationsArray = [...locationsArray, route];
    setLocationsArray(newLocationsArray);
    trueNavigate(route);
  };

  const { children } = props;

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <HistoryContext.Provider value={{
      ...props,
      location,
      navigate,
      params,
      locationsArray,
    }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

RouterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    return (
      <HistoryContext.Consumer>
        {(context) => <Component {...props} history={context} />}
      </HistoryContext.Consumer>
    );
  }

  return ComponentWithRouterProp;
}

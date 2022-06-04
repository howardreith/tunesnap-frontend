import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react';

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        history={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

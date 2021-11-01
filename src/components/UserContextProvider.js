import React from 'react';
import * as PropTypes from 'prop-types';

export const UserContext = React.createContext();

export default class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.setUserInfo = this.setUserInfo.bind(this);

    this.state = { email: null, token: null };
  }

  setUserInfo(userInfo) {
    const { email, token } = userInfo;
    this.setState({ email, token });
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ ...this.state, setUserInfo: this.setUserInfo }}>
        {children}
      </UserContext.Provider>
    );
  }
}

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function withUserContext(Component) {
  return function WrapperComponent(props) {
    return (
      <UserContext.Consumer>
        {(context) => <Component {...props} userContext={context} />}
      </UserContext.Consumer>
    );
  };
}

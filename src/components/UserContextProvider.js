import React from 'react';
import * as PropTypes from 'prop-types';
import { addAccompanimentToCart } from '../utils/backend';

export const UserContext = React.createContext();

export default class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.setUserInfo = this.setUserInfo.bind(this);
    this.updateAccompanimentsSubmittedAndOwned = this.updateAccompanimentsSubmittedAndOwned.bind(this);
    this.addAccompanimentToCart = this.addAccompanimentToCart.bind(this);
    this.setCart = this.setCart.bind(this);

    this.state = {
      email: '',
      token: null,
      displayName: '',
      accompanimentSubmissions: [],
      favoriteSongs: [],
      favoriteAccompaniments: [],
      cart: [],
      accompanimentsOwned: [],
    };
  }

  setUserInfo(userInfo) {
    const {
      email,
      token,
      displayName,
      accompanimentSubmissions,
      favoriteSongs,
      favoriteAccompaniments,
      cart,
      accompanimentsOwned,
    } = userInfo;
    this.setState({
      email,
      token,
      displayName,
      accompanimentSubmissions,
      favoriteSongs,
      favoriteAccompaniments,
      cart,
      accompanimentsOwned,
    });
  }

  setCart(cart) {
    this.setState({ cart });
  }

  async addAccompanimentToCart(accompanimentId) {
    const { token } = this.state;
    const result = await addAccompanimentToCart(accompanimentId, token);
    this.setCart(result.data);
  }

  updateAccompanimentsSubmittedAndOwned(update) {
    const { accompanimentSubmissions, accompanimentsOwned } = update;
    this.setState({ accompanimentSubmissions, accompanimentsOwned });
  }

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={{
        ...this.state,
        setUserInfo: this.setUserInfo,
        updateAccompanimentsSubmittedAndOwned: this.updateAccompanimentsSubmittedAndOwned,
        addAccompanimentToCart: this.addAccompanimentToCart,
        setCart: this.setCart,
      }}
      >
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

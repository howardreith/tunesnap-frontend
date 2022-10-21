import React from 'react';
import * as PropTypes from 'prop-types';
import { addAccompanimentToCart, getUserInfo } from '../../utils/backend';

export const UserContext = React.createContext();

class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.setUserInfo = this.setUserInfo.bind(this);
    this.updateAccompanimentsSubmittedAndOwned = this.updateAccompanimentsSubmittedAndOwned.bind(this);
    this.addAccompanimentToCart = this.addAccompanimentToCart.bind(this);
    this.setCart = this.setCart.bind(this);
    this.updateAccompanimentsOwnedAndCart = this.updateAccompanimentsOwnedAndCart.bind(this);
    this.updateRequestedAccompaniments = this.updateRequestedAccompaniments.bind(this);

    this.state = {
      email: '',
      displayName: '',
      accompanimentSubmissions: [],
      favoriteSongs: [],
      favoriteAccompaniments: [],
      cart: [],
      accompanimentsOwned: [],
      requestedAccompaniments: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('authToken');
    const { email } = this.state;
    if (token && !email) {
      try {
        const { data } = await getUserInfo(token);
        this.setUserInfo(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Your session has expired. Please log back in for personalized features.');
        localStorage.removeItem('authToken');
      }
    }
  }

  setUserInfo(userInfo) {
    const {
      email,
      displayName,
      accompanimentSubmissions,
      favoriteSongs,
      favoriteAccompaniments,
      cart,
      accompanimentsOwned,
      requestedAccompaniments,
    } = userInfo;
    this.setState({
      email,
      displayName,
      accompanimentSubmissions,
      favoriteSongs,
      favoriteAccompaniments,
      cart,
      accompanimentsOwned,
      requestedAccompaniments,
    });
  }

  setCart(cart) {
    this.setState({ cart });
  }

  updateRequestedAccompaniments(updatedList) {
    this.setState({ requestedAccompaniments: updatedList });
  }

  async addAccompanimentToCart(accompanimentId) {
    const token = localStorage.getItem('authToken');
    const result = await addAccompanimentToCart(accompanimentId, token);
    this.setCart(result.data);
  }

  updateAccompanimentsOwnedAndCart(update) {
    const { cart, accompanimentsOwned } = update;
    this.setState({ cart, accompanimentsOwned });
  }

  updateAccompanimentsSubmittedAndOwned(update) {
    const { accompanimentSubmissions, accompanimentsOwned } = update;
    this.setState({ accompanimentSubmissions, accompanimentsOwned });
  }

  render() {
    const { children } = this.props;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <UserContext.Provider value={{
        ...this.state,
        setUserInfo: this.setUserInfo,
        updateAccompanimentsSubmittedAndOwned: this.updateAccompanimentsSubmittedAndOwned,
        addAccompanimentToCart: this.addAccompanimentToCart,
        setCart: this.setCart,
        updateAccompanimentsOwnedAndCart: this.updateAccompanimentsOwnedAndCart,
        updateRequestedAccompaniments: this.updateRequestedAccompaniments,
      }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;

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

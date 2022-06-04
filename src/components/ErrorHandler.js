import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PropTypes from 'prop-types';
import { ErrorContextPropType } from '../utils/propTypes';

export const ErrorContext = React.createContext();

export class ErrorContextProvider extends Component {
  constructor(props) {
    super(props);

    this.setError = this.setError.bind(this);

    this.state = { error: '' };
  }

  setError(error) {
    this.setState({ error });
    setTimeout(() => {
      const { error: currentError } = this.state;
      if (currentError) {
        this.setState({ error: '' });
      }
    }, 5000);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <ErrorContext.Provider value={{
        setError: this.setError,
        error,
      }}
      >
        {children}
      </ErrorContext.Provider>
    );
  }
}

ErrorContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function withErrorContext(MyComponent) {
  return function WrapperComponent(props) {
    return (
      <ErrorContext.Consumer>
        {(context) => <MyComponent {...props} errorContext={context} />}
      </ErrorContext.Consumer>
    );
  };
}

function ErrorHandlerWithoutContext({ errorContext }) {
  const { error: errorMessage } = errorContext;
  if (errorMessage) {
    toast.error(errorMessage, {
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }
  return (
    <ToastContainer position="top-center" />
  );
}

ErrorHandlerWithoutContext.propTypes = {
  errorContext: ErrorContextPropType.isRequired,
};

export default withErrorContext(ErrorHandlerWithoutContext);

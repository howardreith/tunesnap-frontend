import React from 'react';
import { render, screen } from './utils/testUtils';
import App from './App';

describe('App', () => {
  function sutFactory() {
    return render(<App />);
  }
  it('renders the app', () => {
    sutFactory();
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});

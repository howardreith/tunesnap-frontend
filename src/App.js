import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AddSongForm from './components/AddSongForm';
import SongTable from './components/SongTable';
import SongDetails from './components/SongDetails';
import GlobalNav from './components/GlobalNav';
import Login from './components/Login';
import UserContextProvider from './components/UserContextProvider';
import Register from './components/Register';
import UserSettings from './components/UserSettings';
import AccompanimentDetails from './components/AccompanimentDetails';
import Cart from './components/Cart';
import ErrorHandler, { ErrorContextProvider } from './components/ErrorHandler';
import LandingPage from './components/LandingPage';
import { RouterProvider } from './utils/withRouter';

function App() {
  const paypalOptions = {
    // TODO this should be an env variable or something
    'client-id': 'AXGLMO8aKkoFUvF-bAJksG4veyC2AuGF5cATmzPNhcaWtXTs9cKl0oiliH1v252khPm9CUP-2nMNNIIe',
    currency: 'USD',
    intent: 'capture',
    // 'data-client-token': 'abc123xyz==',
  };

  return (
    <div data-testid="app">
      <ErrorContextProvider>
        <ErrorHandler />
        <PayPalScriptProvider
          options={paypalOptions}
        >
          <UserContextProvider>
            <BrowserRouter>
              <RouterProvider>
                <GlobalNav />
                <Routes>
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/" element={<LandingPage />} />
                  <Route exact path="/songs" element={<SongTable />} />
                  <Route path="/songs/add" element={<AddSongForm />} />
                  <Route path="/songs/:id" element={<SongDetails />} />
                  <Route path="/accompaniments/:id" element={<AccompanimentDetails />} />
                  <Route exact path="/settings" element={<UserSettings />} />
                  <Route exact path="/cart" element={<Cart />} />
                </Routes>
              </RouterProvider>
            </BrowserRouter>
          </UserContextProvider>
        </PayPalScriptProvider>
      </ErrorContextProvider>
    </div>
  );
}

export default App;

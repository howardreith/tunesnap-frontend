import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AddSongForm from './components/Songs/AddSongForm';
import SongTable from './components/Songs/SongTable';
import SongDetails from './components/Songs/SongDetails';
import GlobalNav from './components/GlobalNav';
import Login from './components/Login';
import UserContextProvider from './components/User/UserContextProvider';
import Register from './components/Register';
import UserSettings from './components/User/UserSettings';
import AccompanimentDetails from './components/Songs/AccompanimentDetails';
import Cart from './components/User/Cart';
import ErrorHandler, { ErrorContextProvider } from './components/ErrorHandler';
import LandingPage from './components/LandingPage';
import { RouterProvider } from './utils/withRouter';
import MusicianPage from './components/Musician/MusicianPage';
import LoggedOutPage from './components/LoggedOutPage';

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
                  <Route exact path="/musician" element={<MusicianPage />} />
                  <Route path="/songs/add" element={<AddSongForm />} />
                  <Route path="/songs/:id" element={<SongDetails />} />
                  <Route path="/accompaniments/:id" element={<AccompanimentDetails />} />
                  <Route exact path="/settings" element={<UserSettings />} />
                  <Route exact path="/cart" element={<Cart />} />
                  <Route exact path="/logout" element={<LoggedOutPage />} />
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

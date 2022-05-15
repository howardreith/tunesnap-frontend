import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AddSongForm from './components/AddSongForm';
import SongTable from './components/SongTable';
import SongDetails from './components/SongDetails';
// import Admin from './components/Admin';
import GlobalNav from './components/GlobalNav';
import Login from './components/Login';
import UserContextProvider from './components/UserContextProvider';
import Register from './components/Register';
import UserSettings from './components/UserSettings';
import AccompanimentDetails from './components/AccompanimentDetails';
import Cart from './components/Cart';

// TODO The SongTable should eventually be a /songs or something
function App() {
  const paypalOptions = {
    'client-id': 'AXGLMO8aKkoFUvF-bAJksG4veyC2AuGF5cATmzPNhcaWtXTs9cKl0oiliH1v252khPm9CUP-2nMNNIIe',
    currency: 'USD',
    intent: 'capture',
    // 'data-client-token': 'abc123xyz==',
  };

  return (
    <div className="App">
      <PayPalScriptProvider
        options={paypalOptions}
      >
        <BrowserRouter>
          <UserContextProvider>
            <GlobalNav />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/">
                <SongTable />
              </Route>
              <Route path="/songs/add" component={AddSongForm} />
              <Route path="/songs/:id" component={SongDetails} />
              {/* <Route exact path="/admin"> */}
              {/*  <Admin /> */}
              {/* </Route> */}
              <Route path="/accompaniments/:id" component={AccompanimentDetails} />
              <Route exact path="/settings" component={UserSettings} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </UserContextProvider>
        </BrowserRouter>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSongForm from './components/AddSongForm';
import SongTable from './components/SongTable';
import SongDetails from './components/SongDetails';
import Admin from './components/Admin';
import GlobalNav from './components/GlobalNav';
import Login from './components/Login';
import UserContextProvider from './components/UserContextProvider';
import Register from './components/Register';
import UserSettings from './components/UserSettings';
import AccompanimentDetails from './components/AccompanimentDetails';

// TODO The SongTable should eventually be a /songs or something
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <div>
            <GlobalNav />
            <Switch>
              <Route exact path="/">
                <SongTable />
              </Route>
              <Route path="/songs/add" component={AddSongForm} />
              <Route path="/songs/:id" component={SongDetails} />
              {/* <Route exact path="/admin"> */}
              {/*  <Admin /> */}
              {/* </Route> */}
              <Route path="/accompaniments/:id" component={AccompanimentDetails} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/settings" component={UserSettings} />
            </Switch>
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;

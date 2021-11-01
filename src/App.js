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
              <Route path="/songs/add">
                <AddSongForm />
              </Route>
              <Route path="/songs/:id" component={SongDetails} />
              {/* <Route exact path="/admin"> */}
              {/*  <Admin /> */}
              {/* </Route> */}
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;

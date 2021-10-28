import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSongForm from './components/AddSongForm';
import SongTable from './components/SongTable';
import SongDetails from './components/SongDetails';
import Admin from './components/Admin';

// TODO The SongTable should eventually be a /songs or something
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SongTable />
          </Route>
          <Route path="/songs/add">
            <AddSongForm />
          </Route>
          <Route path="/songs/:id" component={SongDetails} />
          <Route exact path="/admin">
            <Admin />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

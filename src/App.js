import React from 'react';
import './App.css';
import AddSongForm from './components/AddSongForm';
import SongTable from './components/SongTable';

function App() {
  return (
    <div className="App">
      <AddSongForm />
      <SongTable />
    </div>
  );
}

export default App;

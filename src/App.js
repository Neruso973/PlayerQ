import './App.css';
import Player from './components/Player'
import Playlist from './components/Playlist'
import AddMusicModal from './components/AddMusicModal'


function App() {
  return (
    <div className="App">
      <h1>Player SenseiQ</h1>
      <Player />
      <Playlist />
      <AddMusicModal />
    </div>
  );
}

export default App;

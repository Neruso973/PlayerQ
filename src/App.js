import './App.css';
import Player from './components/Player';
import Playlist from './components/Playlist';
import AddMusicModal from './components/AddMusicModal';
import { useState } from 'react';
import BlindtestContextProvider from './BlindtestContextProvider';
import { styled } from '@mui/material/styles';
import ScrollTop from './components/ScrollTop';


const WallPaper = styled('div')({
    position: 'fixed',
    width: '100%',
    minHeight: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      top: '-40%',
      right: '-50%',
      background:
        'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
      content: '""',
      width: '140%',
      height: '140%',
      position: 'absolute',
      bottom: '-50%',
      left: '-30%',
      background:
        'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
      transform: 'rotate(30deg)',
    },
  });

function App() {
	const [ queueList, setQueueList ] = useState([]);
	const [ currentTrackIndex, setCurrentTrackIndex ] = useState(0);


	const onPlaylistSelected = (track) => {
		setQueueList([ ...queueList, track ]);
	};

	const onNextTrack = () => {
		if (currentTrackIndex >= queueList.length - 1) {
			return;
		}
		setCurrentTrackIndex(currentTrackIndex + 1);
	};

	const onPreviousTrack = () => {
		if (currentTrackIndex === 0) {
			return;
		}
		setCurrentTrackIndex(currentTrackIndex - 1);
	};

  const addVote = (track) => {
		setQueueList(queueList.map(t => ({ ...t, vote: t === track ? t.vote + 1 : t.vote })));
	}

	return (
<BlindtestContextProvider>
		<div className="App">
			<h1 style={{fontSize: "4em"}}>Player SenseiQ</h1>
			<Player track={queueList[currentTrackIndex]} onNext={onNextTrack} onPrev={onPreviousTrack} />
			<Playlist queueList={queueList} onAddVote={addVote} />
			<AddMusicModal onSelection={onPlaylistSelected} />
      <ScrollTop />
			<WallPaper sx={{zIndex:-1}} />
		</div>
    </BlindtestContextProvider>
	);
}

export default App;

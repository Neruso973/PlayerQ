import { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {

	const [ searchSuggestion, setSearchSuggestion ] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_DEEZFLOW_API}/deezer//search?q=nirvana`)
			.then((response) => response.json())
			.then((data) => setSearchSuggestion(data.data));
	}, []);

  return (
    <div className="App">
      <h1>PLOP</h1>
      <Box>
      <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
      {searchSuggestion.map((track)=>
        <p key={track.id}>{track.id}</p>
      )}

    </div>
  );
}

export default App;

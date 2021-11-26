import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';

const style = {
	position: 'absolute',
	bottom: -395,
	right: -215,
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 750,
	bgcolor: 'white',
  	opacity: 0.85,
	border: '2px solid #000',
	boxShadow: 24,
  	borderRadius: 12,
	p: 4
};

export default function AddMusicModal({ onSelection }) {
	const [ open, setOpen ] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [ searchSuggestion, setSearchSuggestion ] = useState([]);
	const [ mySearchText, setMySearchText ] = useState('');
	const [ songSelected, setSongSelected ] = useState('');

	useEffect(
		() => {
			fetch(`${process.env.REACT_APP_DEEZFLOW_API}/deezer//search?q=${mySearchText}`)
				.then((response) => response.json())
				.then((data) => setSearchSuggestion(data.data));
		},
		[ mySearchText ]
	);

	const handleSearch = (e) => {
		setMySearchText(e.target.value);
		console.log(mySearchText);
	};
	return (
		<div>
			<Icon sx={{ position: 'fixed', right: 20, bottom: 20, fontSize: "4em" }} onClick={handleOpen}>
				add_circle
			</Icon>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<TextField
						id="standard-basic"
						label="Search"
						variant="standard"
						onChange={(e) => handleSearch(e)}
					/>

					{searchSuggestion &&
						searchSuggestion.slice(0, 8).map((track) => (
							<Box
								sx={
									songSelected === track.id ? (
										{
											display: 'flex',
											margin: 2,
											alignItems: 'center',
											borderRadius: 50,
											background: 'yellow'
										}
									) : (
										{
											display: 'flex',
											margin: 2,
											alignItems: 'center',
											borderRadius: 50,
											background: 'red'
										}
									)
								}
								onClick={() => setSongSelected(track.id)}
							>
								<Avatar alt="Cover" src={track.album.cover_small} sx={{ width: 56, height: 56 }} />
								<p key={track.id} style={{ marginLeft: 30 }}>
									{track.title} - {track.artist.name}
								</p>
								{songSelected === track.id && (
									<Icon
										sx={{mx: 5}}
										onClick={() =>
											onSelection({
												id: track.id,
												title: track.title,
												artist: track.artist.name,
												cover: track.album.cover_medium,
												preview: track.preview,
												vote: 1
											})}
									>
										add_circle
									</Icon>
								)}
							</Box>
						))}
					<Button sx={{ position: 'absolute', right: '40%', bottom: 20,}} onClick={handleClose}>close</Button>
				</Box>
			</Modal>
		</div>
	);
}

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import { useContext } from 'react';

import BlindtestContext from '../BlindtestContext';
export default function PlaylistCard({ track, onAddVote }) {

  const {blindtest} = useContext(BlindtestContext)

	return (
		<Card sx={{ display: 'flex', width: '30%', borderRadius: "12px", margin: "10px" }}>
			<CardMedia component="img" sx={{ width: 151, borderRadius: "12px" }} image={blindtest?null:track.cover} alt="???" />
			<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="h5">
						{blindtest? "???" : track.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" component="div">
          {blindtest? "???" :track.artist}
					</Typography>
					<Icon sx={{fontSize:"3em"}} onClick={() => onAddVote(track)}>add_circle</Icon>
				</CardContent>
				<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }} />
			</Box>
		</Card>
	);
}

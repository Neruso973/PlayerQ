import PlaylistCard from './PlaylistCard';

export default function Playlist({ queueList, onAddVote }) {

	return (
		<>
			<h3 style={{fontSize: "2em"}}>{queueList.length !==0 && "Playlist:"}</h3>
			{queueList
				.sort((a, b) => b.vote - a.vote)
				.map((track) => <PlaylistCard key={track.id} track={track} onAddVote={onAddVote} />)}
		</>
	);s
}

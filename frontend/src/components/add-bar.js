import React, { useState } from 'react';

const AddBar = ({ onAdd, artists }) => {
	const [artist, setArtist] = useState(artists[0]._id);
	const [file, setFile] = useState('');

	const add = (e) => {
		e.preventDefault();
		onAdd({artist, file})
	};

	const selectFile = e => {
		const file = e.target.files[0];		
		const fileReader = new FileReader();
		fileReader.onload = e => setFile(e.target.result)
		fileReader.readAsDataURL(file);
	}

	const selectArtist = e => {
		setArtist(e.target.value)	
	} 

	return (
		<form>
			<select value={artist} onChange={selectArtist}>
				{artists.map(artist => <option value={artist._id}>{artist.name}</option>)}
			</select>
			<input
				type="file"
				onChange={selectFile}
			/>
			<button onClick={e => add(e)}>Add</button>
		</form>
	);
};

export { AddBar };

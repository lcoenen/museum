import React, { useState } from 'react';

const AddBar = ({ onAdd }) => {
	const [description, setDescription] = useState('');
	const add = (e) => {
		event.preventDefault();
		onAdd({description})
	};
	return (
		<form>
			<input
				type="text"
				value={description}
				onChange={e => setDescription(e.target.value)}
				placeholder="Enter your task here"
				id="description"
			/>
			<button onClick={e => add(e)}>Add</button>
		</form>
	);
};

export { AddBar };

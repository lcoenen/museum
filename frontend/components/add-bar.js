import React, { useState } from 'react';

const AddBar = ({ onAsk }) => {
	const [description, setDescription] = useState('');

	return (
		<form>
			<input
				type="text"
				value={description}
				onChange={e => setDescription(e.target.value)}
				placeholder="Enter your task here"
				id="description"
			/>
			<button onClick={e => onAsk(description)}>Add</button>
		</form>
	);
};

export { AddBar };

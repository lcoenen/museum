import React from 'react';

const Artist = props => (
	<div>
		<h2>{props.children}</h2>
		{props.pictures.map(picture => (
			<img src={picture} />
		))}
	</div>
);

export { Artist };

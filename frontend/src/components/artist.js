import React from 'react';

const Artist = props => (
	<div>
		<h2>{props.children}</h2>
		{props.pictures.map(picture => (
			<img class="demo" src={picture} />
		))}
	</div>
);

export { Artist };

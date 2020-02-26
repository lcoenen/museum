import React from 'react';

import { Artist } from './artist';

const ArtistsList = ({ artists }) =>
	artists.map(artist => <Artist pictures={artist.pictures}>{artist.name}</Artist>);

export { ArtistsList };

import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, ArtistsList } from '../components';

export const ADD_PICTURE = gql`
	mutation AddPicture($id: String!, $picture: String!) {
		addPicture(_id: $id, picture: $picture)
	}
`;

const GET_LIST = gql`
	query {
		list {
			_id
			name
			pictures
		}
	}
`;

const Artists = () => {
	const [list, setList] = useState([])

	const { loading, error, data } = useQuery(GET_LIST);
	const [addPicture] = useMutation(ADD_PICTURE);

	const onAdd = picture => {
		addPicture({ variables: { id: picture.artist, picture: picture.file } });
		const updatedList = list.map(artist => {
			return artist._id === picture.artist? 
				{...artist, pictures: [].concat(artist.pictures, picture.file)}:
				artist;
		})
		setList(updatedList)
	};

	if(!list.length && data) setList(data.list);

	return (
		<div>
			<h1>Museum!</h1>
			{!loading && !error ? (
				<div>
					<ArtistsList artists={list} />{' '}
					<AddBar artists={list} onAdd={onAdd} />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export { Artists };

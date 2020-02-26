import React from 'react';
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
	const { loading, error, data } = useQuery(GET_LIST);
	const [addPicture, e] = useMutation(ADD_PICTURE);

	const onAdd = picture => {
		addPicture({ variables: { id: picture.artist, picture: picture.file } });
	};

	// console.log({loading, error, data});
	// console.log(e)

	return (
		<div>
			<h1>Museum!</h1>
			{!loading && !error ? (
				<div>
					<ArtistsList artists={data.list} />{' '}
					<AddBar artists={data.list} onAdd={onAdd} />
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export { Artists };

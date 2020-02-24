import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, TodoList } from '../components';

const GET_LIST = gql`
	query {
		list { description }
	}
`;

const Home = () => {

  const { loading, error, data } = useQuery(GET_LIST);

	const [ state, setState ] = useState({
		list: [],
		loading: false
	});

	const addTask = task => setState({ list: list.concat([task]) });

	return (
		<div>
			<h1>onTheGo coding exercise</h1>
			{!loading? 
				<TodoList {...state} /> :
				<p>Loading...</p>
			}
			{data}
			<AddBar onAdd={addTask} />
		</div>
	);
};
export default Home;

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, TodoList } from '../components';

export const ADD_TASK = gql`
  mutation ($task: Task) {
    (addTask: $task)
  }
`;

const GET_LIST = gql`
	query {
		list {
			description
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(GET_LIST);

	const [state, setState] = useState({
		list: [],
		loading: false,
	});

	const addTask = task => setState({ list: state.list.concat([task]) });

	const list = loading? state.list : state.list.concat(data.list);
	console.log('loading', loading)
	console.log('error', error)
	console.log('loading', loading)	
	console.log({state, list})

	return (
		<div>
			<h1>onTheGo coding exercise</h1>
			{!loading ? <TodoList list={list} /> : <p>Loading...</p>}
			<AddBar onAdd={addTask} />
		</div>
	);
};
export default Home;

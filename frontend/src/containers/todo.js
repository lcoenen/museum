import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, TodoList } from '../components';

export const ADD_TASK = gql`
	mutation AddTask($description: String!) {
		addTask(description: $description) 
	}
`;

const GET_LIST = gql`
	query {
		list {
			id
			description
		}
	}
`;

const Todo = () => {
	const { loading, error, data } = useQuery(GET_LIST);
	const [ addTask, e ] = useMutation(ADD_TASK);

	const onAdd = task => { 
		addTask({variables: task })
	};

	console.log({loading, error, data});
	console.log(e)

	return (
		<div>
			<h1>onTheGo coding exercise</h1>
			{(!loading && !error)? <TodoList list={data.list} /> : <p>Loading...</p>}
			<AddBar onAdd={onAdd} />
		</div>
	);
};

export { Todo };

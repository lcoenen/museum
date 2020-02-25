import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, TodoList } from '../components';

// export const ADD_TASK = gql`
//   mutation ($task: Task) {
//     (addTask: $task)
//   }
// `;

const GET_LIST = gql`
	query {
		list {
			description
		}
	}
`;

const Todo = () => {
	const { loading, error, data } = useQuery(GET_LIST);

	const addTask = task => console.warn('adding task')

	console.log({loading, error, data});

	return (
		<div>
			<h1>onTheGo coding exercise</h1>
			{(!loading && !error)? <TodoList list={data.list} /> : <p>Loading...</p>}
			<AddBar onAdd={addTask} />
		</div>
	);
};

export { Todo };

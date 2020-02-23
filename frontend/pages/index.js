import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AddBar, TodoList } from '../components';

const Home = () => {
	const [ state, setState ] = useState({
		list: [],
		loading: false
	});

	const addTask = task => setState({ list: list.concat([task]) });

	return (
		<div>
			<h1>onTheGo coding exercise</h1>
			<TodoList {...state} />
			<AddBar onAdd={addTask} />
		</div>
	);
};
export default Home;

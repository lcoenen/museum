import React from 'react'

import { Task } from './task';

const TodoList = (data) => {
	const { list } = data;
	console.log('data', data);
	return (
		<ul>
			{list.map(task => <Task key={task.description} {...task} />)}
		</ul>
	);
}
export { TodoList }

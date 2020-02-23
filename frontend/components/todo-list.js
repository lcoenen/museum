import React from 'react'

import { Task } from './task';

const TodoList = ({list}) => (
	<ul>
		{list.map(task => <Task {task} />)}
	</ul>
)

export { TodoList }

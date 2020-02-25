import React from 'react';

const Task = ({ id, description }) => <li key={id}>{description}</li>;

export { Task };

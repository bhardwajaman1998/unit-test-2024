import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GetToDoItems = (props) => {
	const [todoitems, setToDoItems] = useState([]);

	useEffect(() => {
		axios
			.get('/todolist')
			.then((results) => {
				console.log('results ', results);
				setToDoItems(results.data);
			})
			.catch((error) => console.log(error));
	}, [props.flag]);

	const handleDelete = (_id) => {
		console.log('_id in handleDelete', _id);
		axios
			.delete(`/todolist/delete/${_id}`, { data: { _id: _id } })
			.then((result) => {
				console.log('result of deletion', result);
				props.setFlag(Math.floor(Math.random() * 1000));
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<h2>To Dos</h2>
			<ul>
				{todoitems.map((todoitem) => (
					<li key={todoitem._id}>
						<h3>{todoitem.item}</h3>
						<p>{todoitem.type.join(', ')}</p>
						<button onClick={() => handleDelete(todoitem._id)}>Delete</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default GetToDoItems;

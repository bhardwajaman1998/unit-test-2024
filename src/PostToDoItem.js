import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const PostToDoItem = (props) => {
	const [todoItem, setToDoItem] = useState();
	const [checkedItems, setCheckedItems] = useState([]);

	const typesArray = ['study', 'chore', 'work', 'other'];

	const handleNameChange = (event) => {
		setToDoItem(event.target.value);
	};

	const handleTypesChange = (event) => {
		let type = event.target.value;
		setCheckedItems([...checkedItems, type]);
		console.log('checkedItems:', checkedItems);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		let data = {
			item: todoItem,
			type: checkedItems,
		};

		axios
			.post('/todolist', data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((results) => {
				let flag = Math.floor(Math.random() * 1000);
				console.log(results);
				props.setFlag(flag);
				setToDoItem('');
				setCheckedItems('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h1>My To Do Items</h1>
			<form onSubmit={(event) => handleFormSubmit(event)}>
				<label>
					New to do:
					<input
						type="text"
						name="item"
						onBlur={(event) => handleNameChange(event)}
					/>
				</label>
				<fieldset>
					<legend>Choose types</legend>
					{typesArray.map((value, index) => (
						<label key={index}>
							{value}
							<input
								type="checkbox"
								value={value}
								// checked={checked}
								onChange={(event) => handleTypesChange(event)}
							/>
						</label>
					))}
				</fieldset>

				<button>Add</button>
				<input type="reset"></input>
			</form>
		</>
	);
};

export default PostToDoItem;

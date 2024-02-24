import React from 'react';
import { useState } from 'react';
import GetToDoItems from './GetToDoItems.js';
import PostToDoItem from './PostToDoItem.js';
import './style.css';

const App = (props) => {
	const [flag, setFlag] = useState();

	return (
		<>
			<PostToDoItem setFlag={setFlag} />
			<GetToDoItems flag={flag} setFlag={setFlag} />
		</>
	);
};

export default App;

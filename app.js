const express = require('express');
const app = express();

const db = require('./db/connection.js');

const server = app.listen(8080, () => console.log('listening'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Todo } = require('./models/Todo.js');

//post a to do
app.post('/todolist', (req, res) => {
	let todo = new Todo(req.body);
	todo.save((error) => {
		if (error) {
			res.status(500).json(error);
			return;
		} else {
			res.status(201).json({
				message: 'New to do item created',
				data: todo,
			});
		}
	});
});

// get all to dos
app.get('/todolist', (req, res) => {
	Todo.find({}).exec((error, result) => {
		if (error) {
			res.status(500).json(error);
			return;
		} else {
			res.json(result);
		}
	});
});

//delete item
app.delete('/todolist/delete/:id', (req, res) => {
	const id = req.params.id;
	Todo.deleteOne({ _id: `${id}` })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete to do item with id=${id}!`,
				});
			} else {
				res.send({
					message: `To do item id=${id} was deleted from the database!`,
				});
			}
		})
		.catch((error) => {
			res.status(500).send({
				message: `Could not delete to do with the id=${id}!`,
			});
		});
});

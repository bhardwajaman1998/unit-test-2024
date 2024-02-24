const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('../db/connection.js');
const Todo = require('./models/Todo.js');

const PORT = process.env.PORT || 8080;

mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(error => console.error('Database connection error:', error));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post a todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ message: 'New todo item created', data: todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete todo item
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Todo.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: `Cannot delete todo item with id=${id}` });
        } else {
            res.json({ message: `Todo item with id=${id} deleted successfully` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = server; // Export the server for testing purposes

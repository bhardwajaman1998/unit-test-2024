const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const TodoSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    type: {
        type: [{type: String}],
        enum: ["study", "chore", "work", "other"]
    }
})

exports.Todo = mongoose.model('Todo', TodoSchema)
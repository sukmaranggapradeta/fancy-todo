const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new Schema({
    todo_name: {
        type: String,
        required: [true, 'Todo name is required'],
        validate:{
            validator: (todo_name)=>{
                if (todo_name.length < 3) throw new Error ('Todo name must have at least 3 characters!')
            }
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: String,
    createdAt: Date,
    due_date: {
        type: Date,
        required: [true, 'Due date is required']
    },
    owner:{
        type: ObjectId,
        ref: 'User'
    }
});

todoSchema.pre('save', function(next){
    this.status = 'open'
    this.createdAt = new Date()
    next()
})

let Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo;
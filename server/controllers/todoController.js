const Todo = require('../models/todoModel')

class todoController{
    static findAll(req, res, next){
        Todo.find()
        .populate('owner')
        .then((todos)=>{
            res.status(200).json(todos)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static findOpen(req, res, next){
        console.log(req.params.id)
        Todo.find({ 
            status: 'open',
            owner : req.params.id
        })
        .populate('owner')
        .then((todos)=>{
            res.status(200).json(todos)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static findHistory(req, res, next){
        Todo.find({ 
            status: 'close',
            owner : req.params.id
        })
        .populate('owner')
        .then((todos)=>{
            res.status(200).json(todos)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static create(req, res, next){
        let { todo_name, description, due_date, owner } = req.body
        Todo.create({ todo_name, description, due_date, owner})
        .then((newTodo)=>{
            res.status(201).json(newTodo)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static updateStatus(req, res, next){
        Todo.findByIdAndUpdate(req.params.id,{
            status: 'close'
        })
        .then((updated)=>{
            res.status(200).json(updated)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static delete(req, res, next){
        Todo.findByIdAndDelete(req.params.id)
        .then((deleted)=>{
            res.status(200).json(deleted)
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = todoController
const Router = require('express').Router();
const todoController = require('../controllers/todoController');

Router.get('/', todoController.findAll);
Router.get('/open/:id', todoController.findOpen)
Router.get('/history/:id', todoController.findHistory)
Router.post('/', todoController.create);
Router.put('/:id', todoController.updateStatus)
Router.delete('/:id', todoController.delete)

module.exports = Router;
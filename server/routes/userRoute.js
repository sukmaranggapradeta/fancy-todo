const Router = require('express').Router()
const userController = require('../controllers/userController')

Router.get('/', userController.find)
Router.get('/:email', userController.getOne)
Router.post('/', userController.create)
Router.delete('/:id', userController.delete)
Router.post('/login', userController.login)

module.exports = Router

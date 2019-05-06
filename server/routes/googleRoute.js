const Router = require('express').Router()
const googleController = require('../controllers/googleController')

Router.post('/', googleController.login)

module.exports = Router
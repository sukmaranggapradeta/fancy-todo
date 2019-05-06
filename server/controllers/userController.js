const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{
    static create(req, res, next){
        let { name, email, password } = req.body
        User.create({name, email, password})
        .then((newUser)=>{
            res.status(201).json(newUser)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static getOne(req, res, next){
        let email = req.params.email
        User.findOne({ email })
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static find(req, res, next){
        User.find()
        .then((users)=>{
            res.status(200).json(users)
        })
        .catch((err)=>{
            next(err)
        })
    }
    static delete(req, res, next){
        let id = req.params.id
        User.findByIdAndDelete(id)
        .then(deleted=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({ email })
        .then((found)=>{
            if (found){
                bcrypt.compare(password, found.password, function(err, response) {
                    if (response){
                        let token = jwt.sign({ name:found.name, id:found.id, email:found.email }, process.env.JWT_SECRET_KEY)
                        res.status(200).json({ 
                            token,
                            id : found.id,
                            name: found.name
                        });
                    }else{
                        next({ name: 'loginFailed'})
                    }
                });
            }else{
                next({ name: 'loginFailed'})
            }
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = UserController
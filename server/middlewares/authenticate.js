const jwt = require('jsonwebtoken')
module.exports = function(req, res, next){
    if (req.headers.hasOwnProperty('token')){
        console.log('masuk authenticate')
        try{
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY)
            console.log(decoded, "ini decoded")
            req.decoded = decoded
            next()
        }catch(e){
            res.status(400).json({ msg: `invalid token` })
        }
    }
}
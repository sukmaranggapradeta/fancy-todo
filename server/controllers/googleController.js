const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken')

class oauthController{
    static login(req, res){
        console.log('----------------------masuk server ---------------------------------------')
        const token = req.headers.token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        // console.log(token ,"-------myTOken")
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then((ticket)=>{
            const {name, email} = ticket.getPayload()
            const myToken = jwt.sign({name ,email } , process.env.JWT_SECRET_KEY, {expiresIn: '1 day'})
            res.status(200).json({
                token: myToken,
                message: 'ini generate token',
                data: {
                    email,
                    name,
                }
            })
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
}

module.exports = oauthController
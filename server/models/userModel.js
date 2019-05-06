const mongoose = require('mongoose')
// mongoose.set('useCreateIndex', true)
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name)=>{
                if (name.length < 3) throw new Error('Name must have at least 3 characters!') 
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address not valid']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

userSchema.path('email').validate( function(){
    return User.findOne({email : this.email})
    .then( data => {
        if(data) return Promise.resolve(false)            
        else return Promise.resolve(true)
    })
}, `Email already registered`)

userSchema.pre('save', function(next) {
    // console.log(this.password, "ini password asli")
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

let User = mongoose.model('User', userSchema);  

module.exports = User
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const googleRoute = require('./routes/googleRoute')
const port = process.env.PORT || 4000;
const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');
const errHandling = require('./middlewares/errorHandling')
const Authenticate = require('./middlewares/authenticate')
const Authorize = require('./middlewares/authorize')

app.use(cors());
app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoute);
app.use('/google', googleRoute);

app.use(Authenticate)//google auth masi error
// app.use(Authorize)
app.use('/todos', todoRoute);

app.use(errHandling)

// mongoose.connect('mongodb://localhost/todoDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://admin:admin@cluster0-4otze.gcp.mongodb.net/test?retryWrites=true', {useNewUrlParser: true},(err)=>{
    if (err) console.log('database err')
    else console.log('connect')
});



app.listen(port, ()=> console.log(`server running at port ${port}`));

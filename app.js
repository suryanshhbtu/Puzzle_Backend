// requestListner -> for handling request easily
const express = require('express'); // importing express

const app = express();              // executing express
const morgan = require('morgan');   // to log every request in terminal for developer prospective
const bodyParser = require('body-parser'); // befor it req.body -> undefined

const mongoose = require('mongoose');  // mongoDB
// to use morgan
app.use(morgan('dev'));

// type of data that can be parsed
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mongoDB connection
mongoose.connect("mongodb+srv://suryanshhbtu:suryanshhbtu@cluster0.cdaqmsj.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
})

// Handling CORS Errors -> Cross-Origin-Resourse-Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const userRoutes = require('./api/routes/users');
app.use('/user', userRoutes);






app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404
    next(error);
});
app.use((error, req, res, next) => {       // ERROR INFORMATION INSIDE HTML into JSON
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;
// requestListner -> for handling request easily
const express = require('express'); // importing express

const app = express();              // executing express




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

app.use((error, req, res, next) => {       // ERROR INDORMATION INSIDE HTML
    res.status(error.status || 500);
    res.json({
        error: {
            text: "Some Error Occured",
            message: error.message
        }
    })
});

module.exports = app;
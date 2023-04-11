const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {type: String},
    email: {type: String, required: true, 
        match:  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password :  {type: String, reqired: true},
    time: {type: Number, default: 0},
    score:{type: Number, default: 0},
    level:{type: Number, default: 0},
    role:{type: String, default:"user"}
});
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        maxlength: 250
    },
    email:{
        type: String,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        minlength: 5,
    },
    lastname:{
        type: String,
        maxLength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String,
    },
    tokenExp:{
        type: Number
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
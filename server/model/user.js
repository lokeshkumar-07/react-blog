const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

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

userSchema.pre('save', ( next )=> {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt) =>{
            if(err){
                return next();
            }else{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                    if(err) return next();
                    user.password = hash;
                    next();
                })
            }
        })
    }
    else{
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save((err, user) => {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token,'secret',(err, decode) => {
        user.findOne({"_id": decode, "token": token}, (err, user) => {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
const User = mongoose.model('User',userSchema);

module.exports = User;
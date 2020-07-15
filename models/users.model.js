//in software dev lifecycle the most imortant stage
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    phoneNumber : {
        type: Number
    },
    address: {
        type: String
    },
    role: {
        type: Number,  // 1,2,3  admin, normal user , visitor
        default: 2
    },
    username: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ['online','offline','away'],
        default: 'online'
    },
    dob: Date,
    gender: {
        type: String
    },
    image: String,
    country: String,
    passwordResetToken: String,
    passwordResetTokenExpiry: Date
}, 
{
    timestamps: true        //for the creation, updation and deletion datas in postman
});

const user = mongoose.model('user', userSchema);
module.exports = user;
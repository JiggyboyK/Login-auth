const mongoose = require("mongoose");

const userSchema = mongoose.Schema (
{
    firstname: {
        type: String,
        default: null,
        required: [true, 'Please add a name']
    }, 

    lastname: {
        type: String,
        // default: null,
        required: [true, 'Please add a name']
    }, 

    email: {
        type: String,
        // default: null,
        unique: true,
        required: [true, 'Please add an email']
    }, 

    password: {
        type: String,
        required: [true, 'Please add a password'],
        
    },
    }, 
    {
        timestamps: true
    });

module.exports = mongoose.model("User", userSchema)
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel")


// @desc    Register/Sign up new user
// @routes  POST  /users
// @access  public
// Register || signup users
const signUp = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, password } = req.body

    if(!firstname || !lastname || !email || !password ) {
        res.status(400).json({message:'Please insert your details'})
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) { 
        res.status(400).json({message: 'User with Email already exists'})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(),   //santize: convert email to lowercase
        password: hash
    })

    if(user) {
        res.status(200).json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400).json({message: 'Invalid user data'})
    }
})

// @desc    Login user
// @routes  POST  /users
// @access  public
const loginUser = asyncHandler(async  (req, res) => {

    const {email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
    res.status(202).json({
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id)
    })
    } else {
        res.status(400).json({message: 'Invalid credentials'})
    }
})

const getMe = asyncHandler(async(req, res) => {
    const {_id, firstname, lastname, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        firstname,   
        lastname,
        email
    })
})

// Generate JWT 
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'60d'
  })
}

module.exports = {
    signUp,
    loginUser,
    getMe,
}
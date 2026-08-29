const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.models');
/* 
    @name registerUserController
    @desc Register a new user,expects username and email in the request body
    @access Public  
*/

async function registerUserController(req, res) {
    const{username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({message: 'Please provide username, email and password'});
    }
    const isUserAlreadyExists = await userModel.findOne({
    $or: [{email}, {username}]
});

if(isUserAlreadyExists) {
    return res.status(400).json({message: 'User already exists'});
}

const hash = await bcrypt.hash(password, 10);
const user = new userModel({
    username,
    email,
    password: hash

});
await user.save();

const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1d'});


res.cookie('token', token)

res.status(201).json({
    message: 'User registered successfully',
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
});

}

/*
    @name loginUserController
    @desc Login a user, expects email and password in the request body
    @access Public  
*/
async function loginUserController(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({email});
    if(!user) {
        return res.status(400).json({message: 'User not found'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(400).json({message: 'Invalid password'});
    }
    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token);
    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            });
        }

        await tokenBlacklistModel.create({
            token: token
        });

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}
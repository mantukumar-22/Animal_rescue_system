const { parse } = require('dotenv');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');


// ======================
// Register User
// ======================
const userRegister = async(req, res) =>{
    try{
        const {firstName, lastName, email, password, mobileNumber} = req.body;

        if (!firstName || !email || !password || !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory"
            });
        }

        const isUserExist = await userModel.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            mobileNumber
        });

        const token = user.generateAuthToken();
        res.cookie('token', token);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Internal server error'
        })
    }
}




// ======================
// Login User
// ======================
const userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

// ======================
// Get Profile
// ======================

const getProfile = async (req, res) => {

    try {

        const users = await userModel.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// ======================
// Get Single Profile
// ======================

const getSingleProfile = async(req, res) => {
    try{
        const { id } = req.params;

        const user = await userModel.findById(id).select('-password');

        if(!user){
            return res.status(404).json({
                success : false,
                message : 'User not found'
            })
        }

         res.status(200).json({
            success: true,
            user
        });
    }catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

// ======================
// Logout
// ======================
const userLogout = async (req, res) => {

    try {

        res.clearCookie("token");

        res.status(200).json({
            success: true,
            message: "Logout Successfully"
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


module.exports = {
    userRegister,
    userLogin,
    getProfile,
    getSingleProfile,
    userLogout
};
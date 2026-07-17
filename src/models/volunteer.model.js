const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const volunteerSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    mobileNumber : {
        type : Number,
        required : true,
    },
    sokectId : {
        type : String
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minLength : [3, "Color must be at least 3 character long"]
        },
        plate : {
            type : String,
            required : true,
            minLength : [3, 'Plate must be at least 3 character long']
        },
        capacity : {
            type : Number,
            required : [1, 'capacity must be at least 1 character long']
        },
        vehicleType : {
            type : String,
            required : true,
            default : 'four-wheeler'
        }
    },
    location : {
        lat : {
            type : Number
        },
        lng : {
            type : Number
        }
    }

}, {timestamps : true })


volunteerSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn : '24'});

    return token;
}

volunteerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

volunteerSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


const volunteerModel = ("User", volunteerSchema);
module.exports = volunteerModel;
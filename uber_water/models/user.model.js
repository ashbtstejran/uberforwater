const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phn: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
   
    Timeofavl: {
        type: String,
        required: true
    },
   
    status: {
        type: String,
        enum:["ACTIVE","INACTIVE"],
        default:'ACTIVE'
    },
    role:{
        type:String,
        enum:["ADMIN","PROVIDER","CUSTOMER"],
        default:'CUSTOMER'
    }

}, {
    timestamps: true,
    versionKey: false
})

module.exports = new mongoose.model('user', userSchema);
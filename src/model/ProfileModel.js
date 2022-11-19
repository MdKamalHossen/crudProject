const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    EmailAddress:{type:String},
    MobileNumber:{type:String},
    City:{type:String},
    userName:{type:String, unique:true},
    Password:{type:String, require:true}

},{versionKey:false});

const userProfile = mongoose.model('profiles', dataSchema);
module.exports = userProfile;
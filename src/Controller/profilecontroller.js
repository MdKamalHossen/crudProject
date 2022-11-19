const jwt = require('jsonwebtoken');
const userProfileController = require('../model/ProfileModel');

exports.CreateProfile=(req, res)=>{
    let reqBody = req.body;
    userProfileController.create(reqBody,(error, data)=>{
        if(error){
            res.status("401").json({status:'Insert Data Fail', data:error});
        }
        else{
            res.status("401").json({status:'Insert Data Success', data:data});
        }
    })
}
exports.UserLogin=(req, res)=>{
    let userName = req.body['userName'];
    let Password = req.body['Password'];


    userProfileController.find({userName:userName,Password:Password},(error, data)=>{
            if(error){
                res.status(400).json({status: ' fail', data: error});
            }
            else{
                 if(data.length>0){
                     let payload = { exp: Math.floor(Date.now()/1000) + (24 * 60 *60),data:data[0]};

                     let Token = jwt.sign(payload,'kamal1234');

                     res.status(200).json({status:'Data Login Success', token:Token, data: data});
                 }
                 else{
                     res.status(401).json({status:'Data Login Unathorize', data: error});
                 }
            }
    })

}

exports.SelectProfile = (req, res)=>{
   let userName = req.headers['username'];
    userProfileController.find ({userName:userName},(err,data)=>{
        if(err){
            res.status(400).json({status:'fail data', data: err});
        }
        else{
            res.status(200).json({status:'success data', data: data});
        }

    })
}
exports.UserProfileUpdate = (req, res)=>{
    let userName = req.headers['username'];
    let requestBody = req.body;

    userProfileController.updateOne({userName:userName},{$set:requestBody},{upsert:true},(error, data)=>{
        if(error){
            res.status(400).json({status:' Data Update fail', data: error});
        }
        else{
            res.status(200).json({status:'Data Update success', data: data});
        }
    })
}
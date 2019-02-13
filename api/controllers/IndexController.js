const sha256 = require('sha256');
const async = require('async');
const moment = require('moment-timezone');
const validator = require('validator');
const {sendMail} =require('./../../nodemailer.js');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

const path = require('path');

const ejs = require('ejs');

// const config = require('./../../config.js');s
var crypto = require('crypto');

const monk = require('monk');

module.exports = {


sendEmailToUser: (req, res) => {
    var email = req.allParams().email;
    var errors = validator.isEmail(email);
    var term  = req.allParams().term;
    var host = req.allParams().host;
    // var user_type = req.allParams().user_type;
    NewUser.findOne({email:email}).then((doc) => {
        if(doc != null){
            // if email exist in newUser table, then email address already initiate for signup process.
            User.findOne({email:email}).then((user)=>{
                console.log("newuser====>",user);
                if(user != null || user == undefined){
                    // console.log()
                    res.send({code: 1, message: `You are already a User . Please login using ${email}. Now it will redirect to login page`, login:true}); 
                }else{
                    // if email does not exist in user table, then you are reinitiate a mail with existing session id. 
                    var link = host + '/usersignup/' + doc.sessionId;
                    sendMail(email, link ,"signup");
                    res.send({code: 1, message: `An email has been sent to ${email}, kindly check the mail inbox to proceed further`, link});
                }
            }).catch((err) => {
                console.log(err);
                res.send({code: 0, message: "This email already registered"});
            });

        }else{
            // You are new and send a fresh signup mail. 
            var generateString = sha256(new Date + email);
            var link = host + '/usersignup/' + generateString;
            NewUser.create({email, sessionId: generateString}).then((doc) => {
                sendMail(email, link ,"signup");
                res.send({code: 1, message: `An email has been sent to ${email}, kindly check your mail to proceed further`, link});
            }).catch((err) => {
                res.send({code: 0, message: "This email already exist"});
                console.log(err);
            });
        }
    }).catch((err) => {
        res.send({code: 0, message: err});
        console.log(err);
    });
    
},
}
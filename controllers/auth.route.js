const express = require('express');
const router = express.Router();
const UserModel = require('./../models/users.model');   //from mongoosedb
const mapUser = require('../helpers/map_user_request');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('./../configs'); 
const nodemailer = require('nodemailer');
const randomString = require('randomstring');
const { PromiseProvider } = require('mongoose');
const { setMaxListeners } = require('./../models/users.model');

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ranamausam74@gmail.com',
        pass: 'javascript-88'
    }
})






 //data aunu paryo object ma
 //aba login ma application ko naam diney
 //to be noted we have to send the data as an object in terms of name,email and link
function prepareMail(data)      
{
    let mailBody = {
        from: 'Our web store <noreply@ourwebstore.com>', // sender address
        to: data.email + 'msamnepal96@gmail.com', // list of receivers
        subject: "Forgot-Password ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <p>Hi <strong>${data.name}</strong></p> 
        <p>We noticed that you are having problem logging into our web store.Please use the link below to reset your password, please note that this link will work within a day only</p>
        <p><a href = '${data.link}'>Click here to reset</a></p>
        <p>If u didnot send the request to change
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        your password kindly ignore this email.</p>
        <p>Regards,</p>
        <p>Our Web Store</p>
        `
        /* html body */
  

    }
    return mailBody;
}



    



//For mongo db to be connected
//commented for mongoose for while
// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient;
// const connURL = 'mongodb://localhost:27017';
// const dbName = 'msamdb';
// const collectionName = 'students';
// mongoClient.connect(connURL, {useUnifiedTopology: true});






//commented for reset-password
router.get('/login',function(req,res,next)
{   
    //res. render() function compiles your template (please don't use ejs), 
    //inserts locals there, and creates html output out of those two things.
    res.render('login.pug', { 
        msg: 'hi and welcome',
        text: 'you r warlmy welcome to node-js and express'
    })
})





/

router.post('/login',function(req, res, next)
    {
        console.log('I AM HERE WHEN FORM IS SUBMITTED', req.body); 
         //for mongoose
        //  res.redirect('/auth/login');
        UserModel.findOne({        //findOne coz object sanga treat gareko ho username euta sanga matra gari rako honi tesaile invalid bhaneko passwordlai
            
            $or: [
                {
                    email: req.body.username
                },
                {
                    username: req.body.username
                    
                }
            ]
            
        })
       
        .then(function (user)
        {
            console.log('user>>', user);
            if(user)
            {   
                var isMatched = passwordHash.verify(req.body.password, user.password)
                if (isMatched)
                    {
                        var token = jwt.sign({ id: user._id }, config.jwtSecret);
                        // {
                        //     expiresIn: 60
                        // });
                        res.status(200).json({
                            user: user,
                            token: token  
                            //each and every login,not storing token just sending
                        });

                     }
                    
                     else
                     {
                        next({

                            msg: "invalid password" 
                    })
                  
              } 
             }
            else
            {
                next
                ({
                    msg:"invalid username"
                })
            }
        })
        .catch(function(err)
        {
            return next(err);
        })
    })
    

        
    



    router.put('/login',function(req,res,next)
            {   
            mongoClient.connect(connURL, function(err,done)
            {
            if(err)
            {
            res.end('client conn failure');
            }
            done.db(dbName).collection(collectionName).update({_id:req.body.id},req.body,function(err,done)
            {
            if(err)
            {
                return next(err);
            }
            if(!done)
            {
                return next({msg:"user not found"});
            }
            res.json({msg:"user updated",done});
            
        })
    })
})



router.post('/register', function (req, res, next)
{   
    console.log('what comes in >>', req.body);
    
    var newUser = new UserModel({});
    var newMappedUser = mapUser(newUser, req.body)
    
    newMappedUser.password=passwordHash.generate(req.body.password)

    // var newUser = new UserModel({}) ;    //database ko modelko euta instance banako
    // newUser.name = req.body.full_name;
    // newUser.email = req.body.email_address;
    // newUser.address = req.body.address;
    // newUser.username = req.body.username;
    // newUser.password = req.body.password;
    // newUser.gender = req.body.gender;
    // newUser.dob = req.body.dob;
    // newUser.country = req.body.country;
    // newUser.status = req.body.status;
    // newUser.address = req.body.address;
    // newUser.phoneNumber = req.body.phoneNumber;
    //  console.log('new user>>',newUser)  //newuser bhaneko obj nai ho,instance ho maile banako model ko

    newMappedUser.save(function(err, done)
    {
        if (err) {
            return next(err);
        }
        res.status(200).json(done);
    })      
    //goto postman and drop the data base and try with new different email id and on...
    // just connecting the mongoose to mongodb nativa driver
    // may arrise error 'cast to number....' ie type conversion error 
    //now go to find in get method above....
})



router.post('/forgot-password',function(req,res,next)
{
    UserModel.findOne({
        email: req.body.email
    })
    .exec(function (err, user)
    {
        if(err)
        {
            return next(err);
        }
        if (user)
        {
            //email sending
            //user bhetisakepachi garney  usermodel bata ako
            const passwordResetToken = randomString.generate(25);
            const passwordResetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);


            var mailData = {
                name: user.username,
                email: user.email,
                link: `${req.headers.origin}/reset-password/${ passwordResetToken }`      //reset kasko lagi garna lako user ko info with id
            }

            const mailContent = prepareMail(mailData);

            //mail janu bhanda agadi nai user lai save gardimna
            //jun token chai generate gareko cham tyo database ma pani content ma pani baseko cha
            user.passwordResetToken = passwordResetToken;
            user.passwordResetTokenExpiry = passwordResetTokenExpiry;
            user.save(function(err, saved)
            {
                if (err)
                {
                    return next(err);
                }
                sender.sendMail(mailContent, function (err,done)  {
                    if(err)
                    {
                        return next(err);
                    }
                    res.json(done);
                })
    
                
            });
            
        }
        else {
            next({
                msg: 'Email not registered yet',
            
            })
        }
    })
})


router.post('/reset-password/:token',function(req, res ,next)
{
    var token = req.params.token;
    UserModel.findOne({
        // _id: token
        passwordResetToken: token,      //this token adn that login token will be matched...
        passwordResetTokenExpiry: {
            $lte: Date.now()
        }
    })
    
    .exec(function (err, user)
    {
        if(err)
        {
            return next(err);
        }
        console.log('user>>>', user);

        if (!user)
        {
            return next({
                msg: "Password Reset Token Invalid or Expired"
            });
        }

        // var currentTime = Date.now();
        // var resetExpiryTime = new Date(user.passwordResetTokenExpiry).getTime();
        // if(currentTime > resetExpiryTime)
        // {
        //     return next({
        //         msg:"Password reset link expired"
        //     })
        // } 
        
        user.password = passwordHash.generate(req.body.password)
        //password reset bhaisakepachadi pheri tyo link click garepachi password reset garna nadiney tesko lagi
       user.passwordResetToken = null;
       user.passwordResetTokenExpiry = null;
        
        
        user.save(function(err,done)  
        {
            if(err)
            {
                return next(err);
            }
            res.json(done);
        })
    })
    
})

module.exports = router;







        //commented for password hashing
   
// router.post('/login',function(req,res,next)
// {
//     console.log('I AM HERE WHEN FORM IS SUBMITTED', req.body); 
//    //req.body function is used to parse the incoming request form-data....
//     // res.redirect('auth/login');
    
//     //for mongoose
//     UserModel.findOne({    //.findone bacause username is only one not different
//         username: req.body.username
//     })
//     .then(function(data)
//     {
//         res.status(200).json(data);
//     })
//     .catch(function(err)
//     {
//         return next(err);
//     })

    //go to postman 
    // find is for array
    //findone is for object
    //now we have to to update and delete and for that we have to go user.route.js
    
    
    //password hashing
//     router.post('/login',function(req,res,next)
//     {
//         // console.log('I AM HERE WHEN FORM IS SUBMITTED', req.body); 
//          //for mongoose
//         UserModel.findOne({        //findOne coz object sanga treat gareko ho username euta sanga matra gari rako honi tesaile invalid bhaneko passwordlai
//             username: req.body.username
//         })
       
//         .then(function (user)
//         {
//             console.log('user>>',user);
//             if(user)
//             {   
//                 var isMatched = passwordHash.verify(req.body.password, user.password)
//                 if (isMatched)
//                     {
//                         res.status(200).json(user);

//                      }
//                      else
//                      {
//                         next({

//                             msg: "invalid password" 
// })
                  
//               } 
//              }
//             else
//             {
//                 next
//                 ({
//                     msg:"invalid username"
//                 })
//             }
//         })
    
//         .catch(function(err)
       
//         {
//             return next(err);
//         })



     //removed for mongoose just for while....
    
//     mongoClient.connect(connURL, function (err, client)
//     {
//         if (err)
//         {   
//             return next(err);
//         }
//         var db = client.db(dbName);
//         db.collection(collectionName)
//         .find({username: req.body.username})
//         .toArray(function(err,done)
        
//         {  
//             if(err)
//             {
//                 return next(err);
//             }
//             res.json(done);
//         })
//     })







 
    //removed for mongoose just for while

    //insert
    // console.log('req.body>>', req.body);
    // mongoClient.connect(connURL,function (err, client)
    // {
    //     if(err)
    //     {
    //         return next(err);
    //     }
    //     var db = client.db(dbName);
    //     db.collection(collectionName).insert(req.body, function (err,done)
    //     {
    //         if(err)
    //         {
    //             return next(err);
    //         }
    //         res.json(done);
    //     })
    // })     //commented for mongoosebd






const express = require('express');
const router = express.Router();
const UserModel = require('./../models/users.model');   //from mongoosedb
const mapUser = require('./../helpers/map_user_request');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const config = require('./../configs/index');


//For mongo db to be connected
//commented for mongoose fow while
// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient;
// const connURL = 'mongodb://localhost:27017';
// const dbName = 'msamdb';
// const collectionName = 'students';
// mongoClient.connect(connURL, {useUnifiedTopology: true});

router.get('/login',function(req,res,next)
{   
    //res. render() function compiles your template (please don't use ejs), 
    //inserts locals there, and creates html output out of those two things.
    res.render('login.pug',{
        msg: 'hi and welcome',
        text: 'you r warlmy welcome to node-js and express'
    })
})

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


router.post('/login',function(req,res,next)
    {
        // console.log('I AM HERE WHEN FORM IS SUBMITTED', req.body); 
         //for mongoose
        UserModel.findOne({        //findOne coz object sanga treat gareko ho username euta sanga matra gari rako honi tesaile invalid bhaneko passwordlai
            username: req.body.username
        })
       
        .then(function (user)
        {
            console.log('user>>',user);
            if(user)
            {   
                var isMatched = passwordHash.verify(req.body.password, user.password)
                if (isMatched)
                    {
                        var token = jwt.sign({ name: user.username, id: user._id, role: user.role}, config.jwtSecret,
                            {
                               expiresIn: 60   //expire bhayepachi hami pheri login page ma redirect new token..
                        });
                        res.status(200).json({
                            user: user,
                            token: token    //each and every login,not storing token just sending
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


     //removed for mongoose just for while....
    
    // mongoClient.connect(connURL, function (err, client)
    // {
    //     if (err)
    //     {   
    //         return next(err);
    //     }
    //     var db = client.db(dbName);
    //     db.collection(collectionName)
    //     .find({username: req.body.username})
    //     .toArray(function(err,done)
        
    //     {  
    //         if(err)
    //         {
    //             return next(err);
    //         }
    //         res.json(done);
    //     })
    // })
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



router.get('/register',function(req,res,next)
{
})

router.post('/register', function (req, res, next)
{   
    console.log('what comes in >>', req.body);
    
    var newUser = new UserModel({});
    var newMappedUser = mapUser(newUser, req.body);
    
    newMappedUser.password = passwordHash.generate(req.body.password);

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

    newMappedUser.save(function(err,done)
    {
        if(err){
            return next(err);
        }
        res.status(200).json(done);
    })      
    //goto postman and drop the data base and try with new different email id and on...
    // just connecting the mongoose to mongodb nativa driver
    // may arrise error 'cast to number....' ie type conversion error 
    //now go to find in get method above....





 
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


})


router.get('/forgot-password',function(req,res,next)
{
})

router.post('/forgot-password',function(req,res,next)
{
})

module.exports = router;



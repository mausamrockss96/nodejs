// const router = require('express').Router();
const express = require('express');
const router = express.Router();
// const dbConfig = require('./configs/db.config');
const UserModel = require('./../models/users.model');   //from mongoosedb
const map_user_req = require('./../helpers/map_user_request');



// router.route('/')

//     .get(function(req, res, next)
//     {
//                 res.send('home of user')
                
//     })

router.route('/')

.get(function(req, res, next)
{       
        //for mongoosedb
        //.exec le first query built garcha ani balla execute garcha
        // eg : .sort ({}) below
       
        UserModel
        .find({})
        // .sort
        // ({                //for descending order in databases
        //       _id: -1  
        // })
        // .limit(2)
        // .skip(1)
        
        .exec (function(err, users)  
        {
                if(err)
                {
                        return next(err);
                }
                res.status(200).json(users);
        })

        //go to postman and 








        //         require('fs').readFile('asdsadad',function(err,done) 
//         {   
//         if(err)
//         {
//                 return next(err);
//         }
// })   





        //COMMENTED FOR MONGOOSEDB JUST FOR WHILE
        
        
        // dbConfig.mongoClient.connect(dbConfig.connURL,function(err, client)
        // {
        //         if(err)
        //         {
        //                 return next(err);
        //         }     
        //         var db = client.db(dbConfig.dbName);
        //         db.collection(collectionName)
        //         .find({})
        //         .toArray(function(err, results)
                
        //         {  
        //             if(err)
        //             {
        //                 return next(err);
        //             }
        
        //         res.json(results);
        // })
        //         })
})



    
    


    router.route('/profile')

    .get(function(req, res, next)
    {

    })
    .post(function(req,res,next)
    {
        Console.log('I CAME FROM FORM');
        res.json({
                hi : 'hello from post request'
        })
    })
    .put(function(req,res,next)
    {

    })
    .delete(function(req,res,next)
    {

    })

    router.route('/change-password')

    .get(function(req,res,next)
    {

    })
    .post(function(req,res,next)
    {

    })
    .put(function(req,res,next)
    {

    })
    .delete(function(req,res,next)
    {

    })

    router.route('/:id')    //id is dynamic value :::

    .get(function(req,res,next)
    {
            //USER FIND BY ID
      
        var id = req.params.id;   
        UserModel.findById(id, function(err, user)
        {
                if(err)
                {
                        return next(err);
                }
                res.status(200).json(user);
        })
       
       //now go to postman and choose and one of the id from the getallusers 
       //and copy that id to getsingleusers under users collection and type in url
       // {{url}}/user/id
       //one object with datas  will come....
       
       
       
       
        //COMMENTED FOR MONGOOSEDB JUST FOR A WHILE......
       
       
        // var objectId = new dbCOnfig.oid(id);  //hamro url ma ako id ko objectID ko instance bancha
        // dbConfig.mongoClient.connect(dbConfig.connURL,function(err, client)
        // {
        //         if(err)
        //         {
        //                 return next(err);
        //         }     
        //         var db = client.db(dbConfig.dbName);
        //         db.collection(collectionName)
        //         .find({_id:objectId})
        //         .toArray(function(err, results)
                
        //         {  
        //             if(err)
        //             {
        //                 return next(err);
        //             }
        
        //         res.json(results);
        // })
        //         })
    })
    
    .put(function(req,res,next)
    {
            //find by id and update  

            const id = req.params.id;   
            UserModel.findOne({_id: id })  
            .exec(function(err, user)
            {
                    if(err)
                    {
                            return next(err);
                    }
                    if(user)
                    {

                        var updatedMappedUser = map_user_req (user, req.body);


                        //  //user and newUser both are mongoose instance
                        // if (req.body.full_name)
                        //  user.name = req.body.full_name;
                        //  if (req.body.email_address)
                        //         user.email = req.body.email_address;
                        //  if (req.body.address)
                        //         user.address = req.body.address;
                        //  if (req.body.username)
                        //         user.username = req.body.username;
                        //  if (req.body.password)
                        //         user.password = req.body.password;
                        //  if (req.body.gender)
                        //         user.gender = req.body.gender;
                        //  if (req.body.dob)
                        //         user.dob = req.body.dob;
                        //  if (req.body.full_country)
                        //         user.country = req.body.country;
                        //  if (req.body.status)
                        //         user.status = req.body.status;
                        //  if (req.body.address)
                        //         user.address = req.body.address;
                        //  if (req.body.phoneNumber)
                        //         user.phoneNumber = req.body.phoneNumber;
                         
                        
                         updatedMappedUser.save(function(err, updated)    //user. rakhda pani change huncha mutation le garda
                         //change huncha, user bhaneko original ho, obj1 ma pugda reference ho ani reference ,a change bhayo
                         //bhane originalma pani reflect huncha, tespachi user pani save huncha..
                        {
                            if(err){
                                return next(err)
                            }
                            res.json(updated);
                        })      
                    }
                    else{
                            next({
                                    msg: 'user not found',
                            })
                    }
                })






        //COMMENTED FOR MONGOOSEDB JUST FOR A WHILE.......
        //     var id = req.params.id;   
        //     var objectId = new dbCOnfig.oid(id);  //hamro url ma ako id ko objectID ko instance bancha
        //     dbConfig.mongoClient.connect(dbConfig.connURL,function(err, client)
        //     {
        //             if(err)
        //             {
        //                     return next(err);
        //             }     
        //             var db = client.db(dbConfig.dbName);
        //             db.collection(collectionName)
        //             .update({_id:objectId},{$set: req.body},function(err, results)
        //             {
        //                     if(err)
        //                     {
        //                             return next(err);
        //                     }
        //                     res.json(results);
        //                 });
        //         })

                    })
    
        
        
        
        .delete(function (req, res, next)
        {
        //delete by id

        var id = req.params.id;   
        UserModel.findById(id, function(err, user)
        {
                if(err)
                {
                        return next(err);
                }
                if(user)
                {
                user.remove(function(err,removed)
                {
                        if(err)
                        {
                                return next(err);
                        }
                     
                res.status(200).json({removed});
                        
                });
        }
                else
                {
                        res.json({
                                msg: "user not found"
                        })
                }
        })
        
        
        
        
        
        
        
        //COMMENTED FOR MONGOOSEDB JUST FOR A WHILE....
        // var id = req.params.id;   
        //     var objectId = new dbCOnfig.oid(id);  //hamro url ma ako id ko objectID ko instance bancha
        //     dbConfig.mongoClient.connect(dbConfig.connURL,function(err, client)
        //     {
        //             if(err)
        //             {
        //                     return next(err);
        //             }     
        //             var db = client.db(dbConfig.dbName);
        //             db.collection(collectionName)
        //             .remove({_id: objectId}, function(err, results)
        //             {
        //                     if(err)
        //                     {
        //                             return next(err);
        //                     }
        //                     res.json(results);
        //                 });
        //         })
    })

    module.exports = router;
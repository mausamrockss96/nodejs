// const router = require('express').Router();
const express = require('express');
const router = express.Router();

// router.route('/')

//     .get(function(req, res, next)
//     {
//                 res.end('home of user')
                
//     })

router.route('/')

.get(function(err,req, res, next)
{
        require('fs').readFile('asdsadad',function(err,done) 
        {   
        if(err)
        {
                return next(err);
        }
})           
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
            //user find by id
    })
    
    .put(function(req,res,next)
    {
            //find by id and update 
    })
    .delete(function(req,res,next)
    {
        //delete by id
    })

    module.exports = router;
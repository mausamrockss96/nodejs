

//TOKEN BASED AUTHENTICATION


var jwt = require('jsonwebtoken');
var config = require('./../configs/index');
// var config = require('./../configs');
const UserModel = require('./../models/users.model')

module.exports = function(req, res, next)
{
    var token;

    if (req.headers['x-access-token'])
    {
        token = req.headers['x-access-token']
    }
    else if (req.headers['authorization'])
    {
        token = req.headers['authorization']

    }
    else if (req.headers['token'])
    {
        token = req.headers['token']

    }
    else if (req.query['token'])
    {
        token = req.query['token']

    }
    if(token)    //token sanga validate garne aba
    {
        jwt.verify(token, config.jwtSecret, function(err,done)
        {
            if (err)
            { 
                return next(err);
            }
        UserModel.findById(done.id)
        .exec(function(err, user)
        {
            if(err)
            {
                return next(err);
            }
            if (!user)
            {
                return next({
                    msg: 'user removed from the system'
                })
            }
            // req.loggedInUser = done;
            req.loggedInUser = user;     //database ma j fresh content cha tei content basdincha prolblem solved

            next();
        })
            

            // commented for verification of user 
            // req.loggedInUser = done;     
            //yo http request ko lgedin user b`hanne key ma euta decode value rakhna painchani, ra yo middleware bata pass hune controller haruma
            //yo property rakhna paincha i.e decoded value
            //go to product.controller.js  and put this req.loggedIn user
            //where whenever u login it gets accessed ie token in findAll method
            // next();
        })
        
    }
    else {
        next({
            msg: "token not provided"
        });
    }
}
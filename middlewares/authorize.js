
//TOKEN BASED AUTHENTICATION

module.exports = function(req, res, next)
{
            if(req.loggedInUser.role !==1)  
            {
            next({
                msg: 'you dont have the permission'
            })
            }
            else{
                return next();
            }
        }



// var jwt = require('jsonwebtoken');
// var config = require('./../configs/index');
// const userModel = require('./../models/users.model')

// module.exports = function(req, res, next)
// {
//     var token;

//     if(req.headers['x-access-token'])
//     {
//         token = req.headers['x-access-token'];
//     }
//     else if (req.headers['authorization'])
//     {
//         token = req.headers['authorization'];

//     }
//     else if (req.headers['token'])
//     {
//         token = req.headers['token'];

//     }
//     if(token)   
//     {
//             jwt.verify(token, config.jwtSecret,function (err,done)
//         {
//             if(err)
//             { 
//                 return next(err);
//             }
//         userModel.findById(done.id)
//         .exec(function(err, user)
//         {
//             if(err)
//             {
//                 return next(err);
//             }
//             if(!user)
//             {
//                 return next({
//                     msg: 'user removed from the system'
//                 })
//             }

//             if(user.role !==1)  
//             {
//             next({
//                 msg: 'you dont have the permission'
//             })
//             }
//             else{
//                 return next();
//             }
//         })
            

           
//         })
        
//     }
//     else{
//         next({
//             msg: "token not provided"
//         });
//     }
// }
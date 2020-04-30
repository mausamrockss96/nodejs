const express = require('express');
const router = express.Router();


router.get('/login',function(req,res,next)
{   
    //res. render() function compiles your template (please don't use ejs), 
    //inserts locals there, and creates html output out of those two things.
    res.render('login.pug',{
        msg: 'hi and welcome',
        text: 'you r warlmy welcome to node-js and express'
    })
})
router.post('/login',function(req,res,next)
{
    console.log('I AM HERE WHEN FORM IS SUBMITTED',req.body); 
    //req.body function is used to parse the incoming request form-data....
    res.redirect('auth/login');
})


router.get('/register',function(req,res,next)
{
})

router.post('/register',function(req,res,next)
{
})


router.get('/forgot-password',function(req,res,next)
{
})

router.post('/forgot-password',function(req,res,next)
{
})

module.exports = router;



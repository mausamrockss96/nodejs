//app/js bhaneko redirect matrai gardiney ho, k endpoint ako cha tesko adharma request-response cycle
//lai redirect gardiney ho

const express = require('express');
const fileOp = require('./file');
const app = express();     //app is entire express framework
// app web ko framework ho junley 
//web ko framework ley web ko server provide garcha, server provide gari sakepachi mero kaam bhaneko
//  tyo web ko server lai listen matra garaune ho
const morgan = require('morgan');
const port= 9090;
const path = require('path');
const pug = require('pug');
app.set('port',7070);
app.set('view engine',pug);
app.set('views',path.join(__dirname, 'templates'))
//views bhanne key ma kun chai folderlai views ko directory banauney, views ko templating file kaha lagera rakhney






const authRoute = require('./controllers/auth.route');
const userRoute = require('./controllers/user.route');
const commentRoute = require('./controllers/comment.route');
const notificationRoute = require('./controllers/notification.route');
const messageRoute = require('./controllers/message.route');
const reviewRoute = require('./controllers/review.route');

//application level middlewares
const checktoken = require('./middlewares/checktoken');
const checkrole = require('./middlewares/checkrole');

//loading third party middleware using morgan from npm js bata leraako
app.use(morgan('dev'));   //dev is options type of morgan

//loading inbuilt level middleware
//for internal use within express
app.use(express.static('files'));
//jun filema mailey (__dirname) gareko chu tyo file ko folder k chata tyo folder diney raicha    
app.use('/file',express.static(path.join(__dirname, 'files') )); 
//parse incoming template from urlencoded data
app.use(express.urlencoded(
    {
        extended: true
    }
))
//if data is in json we have to parse using json parse
//if data is in form-data (for image uploading) we have to use form-data parser...

//ailey mount garey auth bhanne pathma -- bhaktapur janu paryo bhane koteshwor
//bata jancha tesari nai bhaktapur chai auth ani janey kasari chai routing mw
//jati pani business logic cha tyo chai controller ma bhako routing file garne bhayo
//application scale large bhayo bhane
//express bata router le lyako

//ROUTING CONFIGURATION
//V.V.V.V IMPORTANT
// /auth bhanne endpoint ma authRoute bhanne middleware rakhyou;
// app.use(checkToken); //hamiley auth gardaina ramro hudaina authmai garda
// app.use(checkRole); //hamiley auth gardaina ramro hudaina authmai garda
app.use('/auth', authRoute);  //ROUTING LEVEL MIDDLEWARE
// app.use('/comment', commentRoute);    //ROUTING LEVEL MIDDLEWARE
// app.use('/review', reviewRoute);   
// app.use('/user', userRoute);    
// app.use('/notification', notificationRoute);    
// app.use('/message', messageRoute);     

//mathiko kunai pani req-rs fail bhayo bhane athawa unnames path ralhyo bhane execute 404 error
// app.use(function(req,res,next)
// {
//     console.log('404 error')
//     res.end('i am very powerful');
// })


//ERROR HANDLING MIDDLEWARE WITH --  next(with argument);
//yo middlewarema 4 arg pathauda req resp cycle ma audaina, tesaile next ma bhako arg (err) ma 
//pathaune ani err le chai res.json garera msg pathaidincha  
// app.use(function(req,res,next)
// {
//     console.log('404 error')
//     next({
//             msg : 'Not Found',
//             status : 400
//     })
// })

// app.use(function(err,req,res,next)
// {
//     if(err)
//     {
//         console.log('I AM ERROR HANDLING MIDDLEWARE',err);
//         res.json({
//             msg: 'FROM ERR HANDLING MIDDLEWARE',
//             status: err.status || 400 ,
//             text: err.msg || 'something went wrong'
//         });
//     }
// });


// function checkLicense(req,res,next)
// {
// console.log('i am blocked function');
// console.log('i will be present in every http request-response cycle');
// console.log('blocked at middleware');
// res.send('dadasd');
// }




//yo middleware ma jun request chaye get post aye pani execute huncha....
//regardless of any method and url, these middleware comes into an action.
// app.use(function(req,res,next)
// {
// console.log('i am blocked function');
// console.log('i am application level middleware');
// console.log('i will be present in every http request-response cycle');
// // res.send('blocked at middleware');
// next();  //to next middleware functions
// });

//yo middleware chai kalanki path diyo bhane matra exexute huncha.
//this is not routing level middleware, its application level mw itself
//application level middlewarelai (app.get) narrow down matra gareko ho ....
app.get('/kalanki',function(req,res,next) 
{
    console.log('i am here at somewhere i should be');
    res.send('At Kalanki');
    next();
})

app.get('/baneshwor',function(req,res)
{
 res.json({
     msg: 'At baneshwor',
 })
})

app.get('/koteshwor',function(req,res)
{
    res.status(200);
    res.json({
     msg: 'At koteshwor',

 })
})


//middleware access to next middleware functions
// app.use(function(req,res,next)
// {
// console.log('i am another middleware');
// res.send('blocked from 2nd middleware');
// next();
// });






app.get('/read',function(req,res)
{
    console.log('at get empty request');
    //hami response lai end nagarum hami aba data pathauney kaam
    //garum, sakesamma data hami json ma pathaune
    //json bhaneko object ho, jsonlai call garney,bhitra patti object rakhdiney
    //now we have respected individual handlers where each request is responded independently
    //query: req.query -- we can add data in url using query
    console.log('req query', req.query);
    res.json({
        msg: 'hello from express server',
        status: 200,
        query: req.query
    });
    
})
app.get('/write',function(req,res)
{
    res.json({
        msg: 'hi from write end point',
        query: req.query 
        
    })
});

app.get('/write/:filename/:content',function(req,res)
{
//data in get request as part of url
//hamiley endpoint banako ho tara tyo endpoint ma dynamic data pani ako cha
// data will be in request params object, request bhanne kura afaima object ho tya bhitra params 
//bhanney key hudo raicha tyo value pani object nai ho
// one request one response --http stateless protocol...
//req.params: url ma bhako data haru match garney
console.log('req params>>',req.params);
console.log('req query', req.query);

// res.sendStatus(200);
//     res.json({
//         msg: 'hi from write with abcd end point',
//         params: req.params
//     })
    fileOp.write(req.params.fileName, req.params.content)
    .then(function(data)
    {
        res.json({
            msg: 'success',
            query: req.query        
        })

    })
    .catch(function(err)
    {
        res.json(err)
        
    })
});

app.listen(app.get('port'),function(err,done)
{
    if(err)
    {
        console.log('server listening failed');
    }
    else{
        console.log('server listening at port' + app.get('port'));
        console.log('press ctrl + c to exit');
    }


// app.listen(port,function(err,done)
// {
//     if(err)
//     {
//         console.log('server listening failed');
//     }
//     else{
//         console.log('server listening at port' + port);
//         console.log('press ctrl + c to exit');
//     }
})






































//app.use is config middleware
//Middlewares
//Middleware is a function that has access to http request object 
//http response object and next middleware functions
//middleware always comes into action in the middle of request-response cycle.
//like a traffic police amid the bridge in between to source and destinations.
// middleware an modify the http request object and response object
//middleware is very powerful
// TYPES OF MIDDLEWARES:::::
// 1)appication level middlewares--req,res,next
// 2)Routing level middleware(vvvimp)--expressko router bata lerako
// 3)Error handling middleware 
// 4)thirdparty middleware --  npm bata lera ako js tihrdparty
//log ma bhako sabai dekhaucha--servermai dekhna milney req-res middleware(morgan) from npm 
// 5)inbuilt middleware


// SUMMARIZING TOPIC OF THE DAY
//Express and framework(MVC PATTERN)
//nodemon monitoring tool
//express way of handling request
//add individual handler for each and every request
//request
    //dynamic url with value
    //req.params
    //optional url value
    //req.query
//response 
//response status, sendStatus send, end, json
//2 choti response janu vayena error aucha(:cant send errors after they r send)
//MIDDLEWARE
//function that has access to http request and response object
//app.use() configuration block for middleware
//the order of middleware matters
//third party middleware (npmjs ma vakko middleware)
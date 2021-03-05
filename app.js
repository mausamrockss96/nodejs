const express = require('express');
const fileOp = require('./file');
const app = express();     
const morgan = require('morgan');
const port= 9090;
const path = require('path');
const cors = require('cors');


app.set('port',5050);

const apiRoute = require('./routes/api.route');

require('./db');      //mongoosedb



//event driven architecture
var ev = require('events');
const event = new ev.EventEmitter();     
app.use(function(req, res, next) {
    req.myEvent = event;
    next();
})


//socket stuff
const socket = require('socket.io');
const { RSA_NO_PADDING } = require('constants');
const { render } = require('pug');
var io = socket(app.listen(9091));
//socket ko client connect bhaisake pachi matra dekhincha
io.on('connection', function (client)
{
    console.log('client connected to socket server');
    client.on('hi', function (data)
    {
        console.log("data in hi>>", data);
        client.emit('hello', 'hello from server');
    })
    client.on('new-msg', function  (data) {
        client.emit('reply-msg', data);
    })
})



app.use(morgan('dev'));  
app.use(express.static('files'));
app.use('/file',express.static(path.join(__dirname, 'files') )); 
app.use(express.urlencoded(
    {
        extended: true
    }
));
app.use(express.json());

// app.use(checkToken); 
// app.use(checkRole); 

app.use(cors());    
app.use('/api', apiRoute);




// app.use(function(req,res,next)
// {
//     console.log('404 error')
//     res.end('i am very powerful');
// })

 

app.use(function(req,res,next)
{
    console.log('404 error')
    next({
            msg : 'Not Found',
            status : 404
    })
})



event.on('product_data', function (data)
{
    console.log('data>>>', data);
})

event.on('errors', function(errors)
{
    console.log('application errors>>', errors)
})



//Error Handling Middlewares
app.use(function(err, req, res, next)
{
    
        console.log('I AM ERROR HANDLING MIDDLEWARE', err);
        res.status(err.status || 400).json({          // status code is very important in axios backend 
            // msg: 'FROM ERR HANDLING MIDDLEWARE',
            status: err.status || 400 ,
            // err: err.msg || err,
            msg: err.msg || err,

        });
});


// function checkLicense(req,res,next)
// {
// console.log('i am blocked function');
// console.log('i will be present in every http request-response cycle');
// console.log('blocked at middleware');
// res.send('dadasd');
// }


// app.use(function(req,res,next)
// {
// console.log('i am blocked function');
// console.log('i am application level middleware');
// console.log('i will be present in every http request-response cycle');
// // res.send('blocked at middleware');
// next();  //to next middleware functions
// });


// app.get('/kalanki',function(req,res,next) 
// {
//     console.log('i am here at somewhere i should be');
//     res.send('At Kalanki');
//     next();
// })

// app.get('/baneshwor',function(req,res)
// {
//  res.json({
//      msg: 'At baneshwor',
//  })
// })

// app.get('/koteshwor',function(req,res)
// {
//     res.status(200);
//     res.json({
//      msg: 'At koteshwor',

//  })
// })


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
    s
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




// var server = app.listen(port,() => {
    
//     var hostaddr = server.address().address;
//     var portaddr = server.address().port;
//     console.log('address>>', hostaddr);

// })
app.listen(app.get('port'),function(err,done)
{

    console.log('port>>',port)
    if(err)
    {
        console.log('server listening failed');
    }
    else{
        console.log('server listening at port' + app.get('port'));
        console.log('press ctrl + c to exit');
    }
})


// app.listen(app.get('port'),function(err,done)
// {
//     if(err)
//     {
//         console.log('server listening failed');
//     }
//     else{
//         console.log('server listening at port' + port);
//         console.log('press ctrl + c to exit');
//     }
// })


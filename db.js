// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
// It manages relationships between data, provides schema validation, and is 
// used to translate between objects in code and the representation of those objects in MongoDB.

//ODM (OBJECT DATA MODELLING)
//database as an programming laguage object jasari chalaune

//ADVANTAGES
//schema based solutions
//data types
//methods
//midllewares
//plugins(helpful)
//eassy indexing  (kaslai require garney kaslai unique banaune)

// const mongoose = require('mongoose');
// const config =require('./configs/db.config.');  //database sanga ko conn url sabai config ma cha


//commented for socket communication
// connURL ma overall url aune bhayo, "/" ley concatenate garey, ani pheri config kai diney name
// mongoose.connect(config.connURL + "/" + config.dbName,{useNewUrlParser: true} ,function(err,done)
// {
//     if(err)
//     {
//         console.log('error connecting to database>>',err)
//         //yaha next ko scope nai chaina connection ko file matra ho so no next()
//     }
//     else{
//         console.log('db connection successful');
//     }
// })  


//event driven communication
const mongoose = require('mongoose');
const config = require('./configs/db.config.');

mongoose.connect(config.connURL + "/" + config.dbName, { useNewUrlParser: true});
mongoose.connection.once('open', function () {
    console.log('db connection success');

})

mongoose.connection.on('err', function (err)
{
    console.log('db connection failed>>>', err);
})
 
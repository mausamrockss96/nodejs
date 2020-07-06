//model ko communication query sanga query ko communication controller sanga ,
// controller ko communication route sanga
//business log rakhincha yaha

const productQuery = require('./../query/product.query');
const fs = require('fs');    //for removing unwanted files from storage
const path = require('path');

function insert(req, res, next)
{
    //req.body
    //business logic
    console.log('req.file>>>', req.file);
    console.log('req.body>>>', req.body);

    if(req.fileError)
    {
        console.log('Here>>');
        return next({
            msg: 'Invalid file format'
        })
    }

    if(req.file)
    {
        var mimeType = req.file.mimetype.split('/')[0];
        console.log('check mime type>>', mimeType);
        if(mimeType != 'image')
        {   
 
            //SERVER CLEANUP OF UNNECESSARY FILES STORED
            fs.unlink(path.join(process.cwd(),'uploads/images/' + req.file.filename),function(err,done)
            {
                if(err)
                {
                    console.log('file removing error');
                }
                else{
                    console.log('file removed');
                }
            });
            return next({
                msg: 'invalid file format'
            });
        }
    }
    if(req.file)
    {
        req.body.image = req.file.filename;
    }

    req.body.user = req.loggedInUser.id;       //from token and used id bcoz of users username
    //yo kura aba mero query ma jancha, tya insert garda data map ma gayo ani tya user lai map gareko cha
    
    
    //yaha .query le return gareko promise handle bhai rako cha
    productQuery.insert(req.body)
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function (err)
    {
        next(err);
    });
}

// function fetch(req,res,next)
 // findAll for update
function findAll(req,res,next)    

{
    console.log('req.property>>', req.loggedInUser);    
    //from authenticate.js middleware
    //business logic

    //ma admin ho bhane  kosley j pathaye pani herna paye data haru , admin haina bhane maile pathako add gareko matra herna paye
    var condition = {};
    
    if (req.loggedInUser.role != 1)
    {
        condition.user = req.loggedInUser.id;  
    }
    productQuery.find(condition)
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function (err)
    {
        next(err);
    })
}

function getById(req, res, next)
{
    var id = req.params.id;
    var condition = { _id: id };    //business logic afnai
    
    productQuery.find(condition)   //aba malai dohoryayeera uta patti .query file ma getById gari rakhnu pardaina, yesailey kaam garcha
    .then(function(data)
    {
        res.status(200).json(data[0]);     //get ma array ma auna sakcha postman garda, malai object ma chainxa bhane hami sanga ako datalai 0 indexko value ma pathaidiney
    })
    .catch(function (err)
    {
        next(err);
    })

}

//commented for searchByGet 

// function search(req, res, next)
// {
//     var condition = {};    //business logic afnai
    
//     //query ma bhako euta function ley dherai ma kaam gardo raicha , euta find bhanne function le
//      productQuery.find(condition)   //aba malai dohoryayeera uta patti .query file ma getById gari rakhnu pardaina, yesailey kaam garcha
//     .then(function(data)
//     {
//         // res.status(200).json(data[0])  //for id    //get ma array ma auna sakcha postman garda, malai object ma chainxa bhane hami sanga ako datalai 0 indexko value ma pathaidiney
//         res.status(200).json(data)  //for id    //get ma array ma auna sakcha postman garda, malai object ma chainxa bhane hami sanga ako datalai 0 indexko value ma pathaidiney

//     })
//     .catch(function (err)
//     {
//         next(err);
//     })
// }


function searchByGet(req, res, next)
{
    var condition = {};    
    // console.log('body>>', req.body);

    //req.query because hamiley get padhyachau nita get mata ta body audaina tesaile

    var searchCondition = productQuery.map_product_request(condition,req.query)   
    console.log('search Condition>>', searchCondition);
     productQuery.find(searchCondition)   
    .then(function(data)
    {
        res.status(200).json(data);
    }) 
    .catch(function (err)
    {
        next(err);
    })
}


function searchByPost(req, res, next)
{
    var condition = {};  
    console.log('body>>>',req.body);  
    
    var searchCondition = productQuery.map_product_request(condition,req.body)   
    
    if (req.body.minPrice) 
    {
        searchCondition.price = {
            $gte : req.body.minPrice
        }
    }
    if (req.body.minPrice && req.body.maxPrice) 
    {
        searchCondition.price = {
            
            $gte : req.body.minPrice,
            $lte : req.body.maxPrice

        }
    }

    if (req.body.maxPrice) 
    {
        searchCondition.price = {
            $lte : req.body.maxPrice
        }
    }


    if (req.body.fromDate)
    {
     var toDate = req.body.toDate
        ? req.body.toDate
        : req.body.fromDate;
        var fromDate = new Date(req.body.fromDate).setHours(0,0,0,0);
        var toDate = new Date(toDate).setHours(23,59,0,0);

        searchCondition.createdAt = {
            $gte : new Date(fromDateTime),
            $gte : new DataView(toDateTIme)

    }
}
    
    
    console.log('search Condition>>', searchCondition);
    productQuery.find(searchCondition)  
    .then(function(data)
    {
        res.status(200).json(data);  
    })
    .catch(function (err)
    {
        next(err);
    })
}



function remove(req, res, next)
{
    productQuery
    .remove(req.params.id)
    .then(function (data)
    {
        res.status(200).json({data});
    })
    .catch(function(err)
    {
        next(err);
    })
}

function update(req, res, next)  
{
    console.log('update here<<>>', req.body);
    productQuery.
    update(req.params.id,req.body)
    .then(function(data)
    {
        res.status(200).json(data);
    })
    .catch(function(err)
    {
        next(err);
})
}
//now go to prod.route.js



module.exports = {
    // fetch, search
    findAll, insert, getById, remove, update, searchByPost, searchByGet
}
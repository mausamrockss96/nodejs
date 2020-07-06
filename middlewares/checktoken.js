module.exports = function(req,res,next)
{   
    if (req.query.token == 'sammy')
    {
    return next();
}
else
{
    // res.json({
    //     msg: 'invalid token'
    // });

    //error handling middleware
    next({
        status : 401,
        msg: 'INVALID TOKEN'
    });
}
}





module.exports = function (req,res,next)
{   
    if(req.query.role == 1)
    {
    return next();
}
else
{
    // res.json({
    //        msg: 'You dont have permission'
    // });
    next({
        status : 401,
        msg: 'INVALID TOKEN'
    });
}
}



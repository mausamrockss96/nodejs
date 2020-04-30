const fileOp = require('./file'); 
//what comes in bhandata object auney honita aba fileOp ma
const http = require('http');

const server = http.createServer(function(request,response)
{
    //request-- 1st argument http request object
    //response-- 2nd argument http response object
    console.log('request>>',request.method);
    console.log('request url>>',request.url);

    console.log('client connected to server');
    //callback fn execute huncha jaba client le serverlai request pathaucha... 
    
    // response.end('hello Mausam talking from node server');

    if(request.url == '/write')
    {
        fileOp.write('node.txt','testing client-server')
        .then(function(data)
        {
            response.end('file writing success>>');   // data harulai console garney haina client lai response diney ho
            //so response.end
        })
        .catch(function(err)
        {
            response.end('file writing failed');
        })
    }
    else if(request.url == '/read')
    {

    }
    else{
        response.end('no any actions to be performed');
        
    }
});

server.listen(9090,function(err,done)
{
    if(err)
    {
        console.log('err listening',err);
        
    }
    //     else
//     {
//         console.log('server listening at port 9090 inside',done);
//     }
// })
// console.log('server listening at port 9090 outside>>');
//here server listens outside first only then listens to inside hence its asynchronous function but best
//appropriate msg is listening inside....

    else
    {
        console.log('server listening at port 9090 inside');
    }
})

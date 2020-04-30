const a = require('path');
const nodemailer = require('nodemailer');
//import garda node_module and node js ko inbuilt module lai path(./) di rakhnu pardaina....
//file system fs module used to work with files in your system

const fs = require('fs');

// fs.writeFile('test.txt', 'Welcome to nodejs',function(err,done)
// {
//     if(err)
//     {
//         console.log('err>>',err);
//     }
//     else
//     {
//         console.log('success>>', done);
//     }
// });


// //WRITING A FILE
// // fs.writeFile('./abcd.txt', 'welcome to abcd nodejs',function(error,done)
// // {
// //     if(err)
// //     {
// //         console.log('error writing file,err');
// //     }
// //     else{
// //         console.log('file writing success', done);
// //     }
// // });


// // READING A FILE
// // fs.readFile('msam.txt','UTF-8',function(err,done)
// // {
// //     if(err)
// //     {
// //         console.log('error reading file>>',err);

// //     }
// //     else{
// //         console.log('result>>',done);
// //     }
// // })

// // 


// // // REMOVING FILE
// // // fs.unlink('new-msam.txt',function(err,done)
// // // {
// // //         if(err)
// // //     {
// // //         console.log('error removing file>>',err);

// // //     }
// // //     else{
// // //         console.log('REMOVED>>',done);
// // //     }
// // // });

function write(name,content)
{
//     // fs.writeFile('./myfiles/' + name) //can be written making external files
    return new Promise(function(resolve,reject)    //Promise is functional constructor...
    {
    fs.writeFile(name,content,function(err,done)
    {
        if(err)
        {
            console.log('error>>');
            reject(err);

        }
        else{
            console.log('success>>',done);
            resolve(done);
        }
    });
    });
}

// write('node/txt','abcd' )
// .then(function(data)
// {
//     console.log('success in write >>',data);
// })
// .catch(function(err)
// {
//     console.log('error in write>>',err);
// });
// // module.exports = write;

// // //aba hamiley file object ma pathaucha
module.exports = 
{
    write
};
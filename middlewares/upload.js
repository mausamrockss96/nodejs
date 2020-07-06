var multer = require('multer');

// SIMPLE USAGE OF UPLOADING THE FILES
var upload = multer({
    dest: './uploads'
})

var myStorage = multer.diskStorage({
    filename: function (req, file, cb)
    {
        //added Date() to avoid overwriting of two diff files with same name
        cb(null, new Date().getTime() + '-' + file.originalname);     // we keep null to avoid from error, err haina bhannalai
    },
    destination: function (req, file, cb)
    {
        cb(null, './uploads/images/');

    }
});

function fileFilter(req, file, cb)   //multer ==>filefilter ko kaam server ma nai upload nagarney
{
    var mimeType = file.mimetype.split('/')[0];
    if(mimeType == 'image')
    {
        cb(null, true);
    }
    else{
        req.fileError = true;
        cb(null, false);    //false bhako case ma ctrl.js ma retturn gardiney
    }
}

var upload = multer({
    storage: myStorage
})

module.exports = upload;


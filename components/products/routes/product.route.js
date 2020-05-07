var upload = require('./../../../middlewares/upload');
var productCtrl = require('./../controllers/product.ctrl');
//routing garney ho bhane express ko router chaincha
var router = require('express').Router();



router.route('/')
// .get(productCtrl.fetch)
.get(productCtrl.findAll)
.post(upload.single('img'),productCtrl.insert)



//static kura haru sabai fist ma
//search ma .json(data[0]) nagarney kinabhaney search ma j pani auna sakcha
//commented for searchbyget and searchbypost

// router.route('/search')    //used for e-commerce site 
// .get(productCtrl.search)


router.route('/search')    //used for e-commerce site 
.get(productCtrl.searchByGet)
.post(productCtrl.searchByPost)




//id ta dynamic ho tesailey dynamic content haru sadhai last ma, otherwise static kuralai pani dynamic bhandina sakcha
router.route('/:id')
.get(productCtrl.getById)
.put(productCtrl.update)
.delete(productCtrl.remove)






module.exports = router;


//product related routing, controllers, models, query j jati pani cha config pachi helpers chaiyela aileyy mailey product bhanne folder ma rakheko chu, yesko comm sabai poduct bhhanne folder sanga cha
//communication bhaneko main file sanga hunu paryo bhaneko at the end express banaunu bhaneko REST API banaune bhaneko ho 
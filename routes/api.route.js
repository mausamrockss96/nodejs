// this is what we do in future while working

const router = require('express').Router();
const authenticate = require('./../middlewares/authenticate');
const productRouter = require('./../components/products/routes/product.route');



router.use('/product', authenticate, productRouter);    //app.use garya jastai paucha, aba gayera main file app.js ma import garney

module.exports = router;
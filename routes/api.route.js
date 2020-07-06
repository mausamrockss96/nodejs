const router = require('express').Router();
const authenticate = require('./../middlewares/authenticate');
const authorize = require('./../middlewares/authorize');

const productRouter= require('./../components/products/routes/product.route');
const authRouter = require('./../controllers/auth.route');
const userRouter = require('./../controllers/user.route');


router.use('/product', authenticate, productRouter);
router.use('/user', authenticate, authorize, userRouter);
router.use('/auth', authRouter);


module.exports = router;
const router = require('express').Router();
const logRegApiController = require('../controllers/logRegApi.controller')
const productController = require('../controllers/product.controller')
const authJwt = require('../middlewares/authJwt');


router.get('/', logRegApiController.showMessage);
router.post('/register', logRegApiController.register);
router.post('/login', logRegApiController.login);
router.post('/add-product', productController.create);
router.get('/dashboard', authJwt.authJwt, logRegApiController.dashboard);
router.get('/welcome', authJwt.authJwt, logRegApiController.welcome);




module.exports = router;
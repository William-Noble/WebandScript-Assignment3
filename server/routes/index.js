var express = require('express');
var router = express.Router();

const passport = require('passport');
const DB = require('../config/db');
userModel = require('../model/user');
let User = userModel.User;
let indexController = require('../controllers/index');


/* GET index page. */
router.get('/', indexController.displayHomePage);
/* GET home page. */
router.get('/home', indexController.displayHomePage);
/* GET About page. */
router.get('/aboutus', indexController.displayAboutPage);
/* GET products page. */
router.get('/products', indexController.displayProductPage);
/* GET service page. */
router.get('/service', indexController.displayServicePage);
/* GET contactus page. */
router.get('/contactus', indexController.displayContactPage);

router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);
router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage);
router.get('/logout', indexController.performLogout);

module.exports = router;

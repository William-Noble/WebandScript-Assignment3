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
/* GET Login page. */
router.get('/login', indexController.displayLoginPage);
/* POST Login page. */
router.post('/login', indexController.processLoginPage);
/* GET Register page. */
router.get('/register', indexController.displayRegisterPage);
/* POST Register page. */
router.post('/register', indexController.processRegisterPage);
/* GET Logout page. */
router.get('/logout', indexController.performLogout);

module.exports = router;

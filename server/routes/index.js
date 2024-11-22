let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
let jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about',indexController.displayAboutPage);

/* GET products page. */
router.get('/products',indexController.displayProductPage);

/* GET services page. */
router.get('/services',indexController.displayServicePage);
// CRUD --> CREATE, Read, Update , Delete
// Get - Post - Read - Put
/* GET contact page. */
router.get('/contact', indexController.displayContactPage);
// Get router for login page
router.get('/login',indexController.displayLoginPage);
//post router for login page
router.post('/login',indexController.processLoginPage);
// Get router for registration page
router.get('/register',indexController.displayRegisterPage);
//post router for registration page
router.post('/register',indexController.processRegisterPage);
// Get router for logout page
router.get('/logout',indexController.performLogout);
module.exports = router;

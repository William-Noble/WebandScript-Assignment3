let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); // npm i mongoose
let jwt = require('jsonwebtoken');
// connect with book model

let Book = require('../models/book');
let bookController = require('../controller/book');
/* CRUD Operation*/

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* Read Operation */
/* Get route for the book list */

router.get('/',bookController.displayBookList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation */
router.get('/add',requireAuth, bookController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation */
router.post('/add',requireAuth, bookController.processAddPage);
/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation */
router.get('/edit/:id',requireAuth,bookController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation */
router.post('/edit/:id',requireAuth, bookController.processEditPage);
/* Delete Operation */
/* Get to perform Delete Operation -- Deletion */
router.get('/delete/:id',requireAuth,bookController.performDelete);


module.exports=router;
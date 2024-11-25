var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// requireAuth function is not needed on this page
function requireAuth(req,res,next)
{
	if(!req.isAuthenticated())
	{
		return res.redirect('/login');
	}
	next();
}

// telling my router that I have this model
let Assignment = require('../model/assignment');
const assignment = require('../model/assignment');
let assignmentController = require('../controllers/assignment.js')
/* Get route for the assignment list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the assignments list */

router.get('/',assignmentController.displayAssignmentslist);
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',requireAuth,assignmentController.displayAddPage);
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',requireAuth,assignmentController.processAddPage);
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',requireAuth,assignmentController.displayEditPage);
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',requireAuth,assignmentController.processEditPage);
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',requireAuth,assignmentController.performDelete);
module.exports = router;
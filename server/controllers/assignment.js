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

// display assignment list function
module.exports.displayAssignmentslist = async (req,res,next)=>{
    try{
        const AssignmentList = await Assignment.find().sort({ DateTime: 1 });
        res.render('Assignment/list',{
            title:'Assignments',
            displayName: req.user ? req.user.displayName:'',
            AssignmentList:AssignmentList
        })}
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            title:'Assignments',
            displayName: req.user ? req.user.displayName:'',
            error:'Error on the server'
        })
    }
};
/* Create Operation --> Get route for displaying me the Add Page */
module.exports.displayAddPage = (req,res,next)=>{
    try{
        res.render('Assignment/add',{
            title: 'Add Assignment',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
};
/* Create Operation --> Post route for processing the Add Page */
module.exports.processAddPage = (req,res,next)=>{
    try{
        let newAssignment = Assignment({
            "Title":req.body.Title,
            "DateTime":req.body.DateTime,
            "Location":req.body.Location,
            "Description":req.body.Description,
            "User":req.body.User
        });
        Assignment.create(newAssignment).then(()=>{
            res.redirect('/assignmentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
};
/* Update Operation --> Get route for displaying me the Edit Page */
module.exports.displayEditPage = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const assignmentToEdit= await Assignment.findById(id);
        res.render('Assignment/edit',
            {
                title:'Edit Assignment',
                displayName: req.user ? req.user.displayName:'',
                Assignment:assignmentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
};
/* Update Operation --> Post route for processing the Edit Page */ 
module.exports.processEditPage = (req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedAssignment = Assignment({
            "_id":id,
            "Title":req.body.Title,
            "DateTime":req.body.DateTime,
            "Location":req.body.Location,
            "Description":req.body.Description,
            "User":req.body.User
        });
        Assignment.findByIdAndUpdate(id,updatedAssignment).then(()=>{
            res.redirect('/assignmentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
};
/* Delete Operation --> Get route to perform Delete Operation */
module.exports.performDelete = (req,res,next)=>{
    try{
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(()=>{
            res.redirect('/assignmentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
};
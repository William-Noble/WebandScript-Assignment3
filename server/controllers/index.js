var express = require('express');
var router = express.Router();

const passport = require('passport');
const DB = require('../config/db');
userModel = require('../model/user');
let User = userModel.User;


/* GET index page. */
module.exports.displayHomePage = (req, res, next) => {
  res.render('index', {
    title: 'Home',
    displayName: req.user ? req.user.displayName:''
  });
};
/* GET home page. */
// router.get('/home', function(req, res, next) => {
//   res.render('index', {
//     title: 'Home',
//     displayName: req.user ? req.user.displayName:''
//   });
// });
/* GET About page. */
module.exports.displayAboutPage = (req, res, next) => {
  res.render('index', {
    title: 'About us',
    displayName: req.user ? req.user.displayName:''
  });
};
/* GET products page. */
module.exports.displayProductPage = (req, res, next) => {
  res.render('index', {
    title: 'Products',
    displayName: req.user ? req.user.displayName:''
  });
};
/* GET service page. */
module.exports.displayServicePage = (req, res, next) => {
  res.render('index', {
    title: 'Service',
    displayName: req.user ? req.user.displayName:''
  });
};
/* GET contactus page. */
module.exports.displayContactPage = (req, res, next) => {
  res.render('index', {
    title: 'Contact Us',
    displayName: req.user ? req.user.displayName:''
  });
};
// Get login page
module.exports.displayLoginPage = (req,res,next) => {
	if(!req.user) //use small u in user here
	{
    res.render('Auth/login',
    {
      title:'Login',
      message:req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    });
	}
	else
	{
		return res.redirect('/')
	}
}
// post operation for login page
module.exports.processLoginPage = (req,res,next) => {
	passport.authenticate('local',(err,user,info)=>{
		if(err)
		{
			return next(err)
		}
		if(!user)
		{
			req.flash('loginMessage', 'Authentication Error');
			return res.redirect('/login');
		}
		req.login(user,(err)=>{
			if(err)
			{
				return next(err)
			}
			return res.redirect('/assignmentslist');
    })
	})(req,res,next)
}
// get register page
module.exports.displayRegisterPage = (req,res,next) => {
	if(!req.user)
	{
		res.render('Auth/register',{
			title: 'Register',
			message:req.flash('registerMessage'),
			displayName: req.user ? req.user.displayName:''
		})
	}
	else
	{
		return res.redirect('/')
	}
}
// post operation for register page
module.exports.processRegisterPage = (req,res,next) => {
	let newUser = new User({
		username:req.body.username,
		//password:req.boy.password,
		email:req.body.email,
		displayName:req.body.displayName
	})
	User.register(newUser, req.body.password, (err) =>{
		if(err)
		{
			console.log("Error:Inserting the new User");
			if(err.name=="UserExistError")
			{
				req.flash('registerMessage', 'Registration Error: User already exists')
			}
			return res.render('Auth/register', {
				title: 'Register',
				message:req.flash('registerMessage'),
				displayName:req.user ? req.user.displayName:''
			});
		}
		else
		{
			return passport.authenticate('local')(req,res,()=>{
				res.redirect('/assignmentslist')
			})
		}	
	})
}
// perform logout function
module.exports.performLogout = (req,res,next) => {
	req.logOut(function(err){
		if(err)
		{
			return next(err);
		}
	})
	res.redirect('/')
}


let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
// define schema for User information
let User = mongoose.Schema({
	username:
	{
		type:String,
		default:"",
		trim:true,
		required:'Username is required'
	},
	/*password:
	{
		type:String,
		default:"",
		trim:true
		required:'Password is required'
	},*/
	displayName:
	{
		type:String,
		default:"",
		trim:true,
		required:'Display name is required'
	},
	email:
	{
		type:String,
		default:"",
		trim:true,
		required:'Email name is required'
	},
	created:
	{
		type:Date,
		default:Date.now
	},
	update:
	{
		type:Date,
		default:Date.now
	}
},
{
	collection:"user"
})

// configure options for user model
let options = ({MissiongPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User',User);

//const { Collection, default: mongoose } = require("mongoose");

let mongoose = require("mongoose");

// create model for mongoose database
let assignmentModel = mongoose.Schema({
    Title: String,
    DateTime: String,
    Location: String,
    Description: String,
    User: String
},
{
    collection:"Assignments"
});
// export model
module.exports = mongoose.model('Assignment',assignmentModel);

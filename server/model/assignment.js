//const { Collection, default: mongoose } = require("mongoose");

let mongoose = require("mongoose");

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
module.exports = mongoose.model('Assignment',assignmentModel);

//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let assignmentModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: Number
},
{
    collection:"Bio_assignments"
});
module.exports =mongoose.model('Assignment',assignmentModel);

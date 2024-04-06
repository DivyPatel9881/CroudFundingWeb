var mongoose = require("mongoose")
var Comment = require("./Comment.js")

var ProjectSchema = mongoose.Schema({
	name:String,
	category:String,
	description:String,
	photo:String,
	video:String,
	goal:String,
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	comments:[{
		type : mongoose.Schema.Types.ObjectId,
		ref : "Comment"
	}],
	backers:[{
		type : mongoose.Schema.Types.ObjectId,
		ref : "User"
	}],
	funds:{
		type:Number,
		default:0
	},
	accountholdername:String,
	accountnum:String,
	ifsc:String
})

module.exports = mongoose.model("Project",ProjectSchema)
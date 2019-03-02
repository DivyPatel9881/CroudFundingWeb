var mongoose = require("mongoose")

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
	}
	//accountnum:String,
	//ifsc:String,
})

module.exports = mongoose.model("Project",ProjectSchema)
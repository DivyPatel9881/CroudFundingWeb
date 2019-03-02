var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = mongoose.Schema({
	fullname:String,
	phone:String,
	gender:String,
	aadharNum:String,
	emailId:String,
	username:String,
	password:String,
	projects:[{
		type:mongoose.Schema.Types.ObjectId,
		req:"Project"
	}]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)
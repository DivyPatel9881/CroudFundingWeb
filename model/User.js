var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = mongoose.Schema({
	full_name: String,
	phone: String,
	gender: String,
	ssn: String,
	email: String,
	username: String,
	password: String,
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		req: "Project"
	}]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)
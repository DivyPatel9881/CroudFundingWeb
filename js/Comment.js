var mongoose = require("mongoose")

var CommentSchema = new mongoose.Schema({
	Comment:String,
	author:{
		type : mongoose.Schema.Types.ObjectId,
		ref:"User"
	}
})

module.exports = mongoose.model("Comment",CommentSchema)
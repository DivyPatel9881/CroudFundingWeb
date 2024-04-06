var User = require('../model/User.js')

function registerDetails(req, res) {
	fullname = req.body.fullname
	phone = req.body.phone
	aadharnum = req.body.aadharnum
	gender = req.body.gender
	User.find({aadharNum: aadharnum}, function(error, user) {
		if (error) {
			console.log(error)
		} else if(user[0]==undefined) {
			flag = 1
			res.redirect("/register/signup")
		} else {
			console.log("User already exists.")
			res.redirect("/register/details")
		}
	})
}

module.exports = registerDetails;
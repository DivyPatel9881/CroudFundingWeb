var User = require('../model/User.js')

function registerDetails(req, res) {
	fullname = req.body.fullname
	phone = req.body.phone
	ssn = req.body.ssn
	gender = req.body.gender
	User.find({ssn: ssn}, function(error, user) {
		if (error) {
			console.log(error)
		} else if(user[0]==undefined) {
			res.redirect("/register/signup")
		} else {
			console.log("User already exists.")
			res.redirect("/register/details")
		}
	})
}

module.exports = registerDetails;
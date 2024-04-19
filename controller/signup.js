var User = require("../model/User.js")
var passport = require("passport")

function signup(req, res){
	User.find({email: req.body.email}, function(err, user) {
		if (err) {
			console.log(err)
		} else if (user[0] == undefined) {
			var newUser = new User({
				full_name: fullname,
				phone: phone,
				aadharNum: ssn,
				gender: gender,
                email: req.body.email,
				username: req.body.username
			});
			User.register(newUser, req.body.password, function(err, user) {
				if (err) {
					console.log(err)
					res.redirect("/register/signup")
				} else {
					passport.authenticate("local")(req, res, function() {
						// req.flash("success","Registered successfully")
						res.redirect("/")
					})
				}
			})
		} else {
			res.redirect("/register/signup")
		}
	})
}

module.exports = signup;
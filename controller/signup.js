var User = require("../model/User.js")

function signup(req, res){
	User.find({emailId: req.body.email}, function(err, user) {
		if (err) {
			console.log(err)
		} else if (user[0] == undefined) {
			var newUser = new User({
				fullname: fullname,
				phone: phone,
				aadharNum: aadharnum,
				gender: gender,
                emailId: req.body.email,
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
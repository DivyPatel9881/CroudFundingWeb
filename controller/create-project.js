var User = require("../model/User.js")
var Project = require("../model/Project.js")

function createProject(req, res) {
	sanitize = req.sanitize
	description = sanitize(req.body.description)
	console.log(req.user)
	Project.create({
		name: req.body.name,
		category: req.body.category,
		description: description,
		photo: req.body.photo,
		video: req.body.video,
		goal: req.body.goal,
		author: req.user,
		account_holder_name: req.body.accoutholdername,
		account_num: req.body.accountnum,
		routing_num: req.body.rout
	}, function(err, project) {
		if (err) {
			console.log(err)
		} else {
			User.findById(project.author, function(err, user) {
				if (err) {
					console.log(err)
				}
				else {
					user.projects.push(project)
					user.save(function(err, user) {
						if (err) {
							console.log(err)
						} else {
							res.redirect("/")
						}
					})
				}
			})
		}
	})
}

module.exports = createProject;
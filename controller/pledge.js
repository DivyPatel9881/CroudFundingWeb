var Project = require("../model/Project.js")

function pledge(req, res) {
	Project.findById(req.params.id, function(err,project) {
		project.funds = parseInt(project.funds) + parseInt(req.body.amount)
		project.backers.push(req.user)
		project.save(function(err, project) {
			if (err) {
				console.log(err)
			} else {
				res.redirect("/projects/know-more/"+req.params.id)
			}
		})
	})
}

module.exports = pledge;
var Project = require("../model/Project.js")

function getProjects(req, res) {
	Project.find({category:req.params.category}, function(err, projects){
		if (err) {
			console.log(err)
		} else {
			res.render("category_projects.ejs",{projects:projects, category:req.params.category})
		}
	})
}

module.exports = getProjects;
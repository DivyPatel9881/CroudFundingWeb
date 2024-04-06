var Project = require("../model/Project.js")

function renderPledge(req, res) {
    Project.findById(req.params.id,function(err, project){
		if (err) {
			console.log("err")
		} else {
			res.render("pledge.ejs",{project:project})
		}
	})
}

module.exports = renderPledge;
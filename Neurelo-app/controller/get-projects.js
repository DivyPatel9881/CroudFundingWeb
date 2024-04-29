var {Project, ProjectApiService} = require('neurelo-sdk');
var user = require("./user.js");

async function getProjects(req, res) {
	try {

		var projects_res = await ProjectApiService.findProject({category: req.params.category});
		res.render("category_projects.ejs", {projects: projects_res.data?.data, category: req.params.category, user: user});

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	getProjects: getProjects
};
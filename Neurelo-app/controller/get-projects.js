var {ProjectApiService} = require('neurelo-sdk');
var user = require("./user.js");

async function getProjects(req, res) {
	try {

		var projects_res = await ProjectApiService.findProject(undefined, {
			"category": {
				"equals": req.params.category
			}});
		console.log(projects_res.data?.data);
		res.render("category_projects.ejs", {projects: projects_res.data?.data, category: req.params.category, user: user});

	} catch(error) {
		console.log(error);
		res.render("category_projects.ejs", {projects: [], category: req.params.category, user: user});
	}
}

module.exports = {
	getProjects: getProjects
};
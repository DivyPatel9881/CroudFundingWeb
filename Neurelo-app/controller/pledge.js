var {Project, ProjectApiService} = require('neurelo-sdk');

async function pledge(req, res) {
	try {

		var project_res = await ProjectApiService.findProjectById(req.params.id);
		var project = project_res.data?.data;

		project.funds = parseInt(project.funds) + parseInt(req.body.amount);
		project.backers.push(req.user);

		try {
			project_res = await ProjectApiService.updateProjectById(req.params.id, project)

			res.redirect("/projects/know-more/"+req.params.id)
		} catch(error) {
			console.log(error);	
		}

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	pledge: pledge
};
var {Project, ProjectApiService} = require('neurelo-sdk')

async function renderPledge(req, res) {
	try {

		const project_res = await ProjectApiService.findById(req.param.id);
		res.render("pledge.ejs", {project: project_res.data?.data})

	} catch (error) {
		console.log(error);
	}
}

module.exports = renderPledge;
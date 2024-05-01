var {ProjectApiService} = require('neurelo-sdk');
var user = require("./user.js");

async function renderPledge(req, res) {
	try {

		const project_res = await ProjectApiService.findById(req.param.id);
		res.render("pledge.ejs", {project: project_res.data?.data, user: user})

	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	renderPledge: renderPledge
};
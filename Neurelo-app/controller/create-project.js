var {User, Project, UserApiService, ProjectApiService} = require('neurelo-sdk');
var mongoose = require('mongoose');

async function createProj(req, res) {
	sanitize = req.sanitize;
	description = sanitize(req.body.description);
	console.log(req.body.user);

	try {

		var project_res = await ProjectApiService.createOneProject({
				name: req.body.name,
				category: req.body.category,
				description: description,
				photo: req.body.photo,
				video: req.body.video,
				goal: req.body.goal,
				author: req.body.user,
				account_holder_name: req.body.accoutholdername,
				account_num: req.body.accountnum,
				routing_num: req.body.rout,
				id: mongoose.Types.ObjectId()
			})
		var project = project.data?.data;

		try {

			var user_res = await UserApiService.findUserById(project.author);
			var user = user_res.data?.data;

			try {

				var user_update_res = await UserApiService.updateUserById(user.id, user);
				res.redirect('/');

			} catch(error) {
				console.log(error);
			}

		} catch(error) {
			console.log(error);
		}

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	createProject: createProj
};
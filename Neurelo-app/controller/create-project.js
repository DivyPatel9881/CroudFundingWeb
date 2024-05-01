var {UserApiService, ProjectApiService} = require('neurelo-sdk');
var mongoose = require('mongoose');
var Dummy_User = require('./user.js');

async function createProj(req, res) {
	sanitize = req.sanitize;
	description = sanitize(req.body.description);
	req.body.user = Dummy_User;

	try {

		var project_res = await ProjectApiService.createOneProject({
				name: req.body.name,
				category: req.body.category,
				description: description,
				photo: req.body.photo,
				video: req.body.video,
				goal: req.body.goal,
				author: req.body.user._id,
				account_holder_name: req.body.accountholdername,
				account_num: req.body.accountnum,
				routing_num: req.body.rout,
				id: mongoose.Types.ObjectId()
			})
		var project = project_res.data?.data;
	
		try {

			var user_res = await UserApiService.findUserById(project.author);
			var user = user_res.data?.data;

			try {
				var id = user.id;
				delete user.id;
				var user_update_res = await UserApiService.updateUserById(id, user);
				res.redirect('/');

			} catch(error) {
				console.log(error);
			}

		} catch(error) {
			console.log(error.response.data);
		}

	} catch(error) {
		console.log(error.response.data.errors);
	}
}

module.exports = {
	createProject: createProj
};
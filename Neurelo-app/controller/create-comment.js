var {Project, ProjectApiService, Comment, CommentApiService} = require("neurelo-sdk")
var mongoose = require('mongoose');

async function createComment(req, res) {
	var sanitize = req.sanitize;

	try {

		var project_res = await ProjectApiService.findProjectById(req.params.id);
		var project = project_res.data?.data;

		try {

			var comment_res = await CommentApiService.createOneComment({
					comment: sanitize(req.body.comment),
					author: req.body.user,
					id: mongoose.Types.ObjectId()
				});
			var comment = comment_res.data?.data;

			try {

				project.comments.push(comment._id);
				var project_update_res = await ProjectApiService.updateProjectById(project._id, project);
				res.redirect("/projects/know-more/" + req.params.id)

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

module.exports = createComment;
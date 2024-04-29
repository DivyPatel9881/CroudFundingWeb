var {Project, ProjectApiService, Comment, CommentApiService, User, UserApiService} = require('neurelo-sdk');
var user = require('./user.js');

async function projectKnowMore(req, res) {
	try {

		var project_res = await ProjectApiService.findProjectById(req.params.id);
		var project = project_res.data?.data;

		let CommentAuthors = []
		if (project.comments.length != 0) {
			project.comments.forEach(async function (commentid) {
				try {
		
					var comment_res = await CommentApiService.findCommentById(commentid)
					var comment = comment_res.data?.data;
					
					try {
			
						const user_res = await UserApiService.findUserById(comment.author);
						const user = user.data?.data;

						CommentAuthors.push(user.username);
						if (project.comments.length == CommentAuthors.length) {
							res.render("know_more.ejs", {project:project, CUsers:CommentAuthors, user: user})
						}

					} catch(error) {
						console.log(error);
					}
	
				} catch(error) {
					console.log(error);
				}
			})
		} else {
			res.render("know_more.ejs", {project:project, CUsers:CommentAuthors, user: user})
		}

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	projectKnowMore: projectKnowMore
};
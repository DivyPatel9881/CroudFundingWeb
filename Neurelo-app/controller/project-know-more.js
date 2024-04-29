var User = require("../model/User.js")
var Project = require("../model/Project.js")

function projectKnowMore(req, res) {
	Project.findOne({_id:req.params.id}).populate([
		{path:"author"},
		{path:"comments",
		 populate:{path:"comments"}
		 }
		]).exec(function (err, project) {
			if (err) {
				console.log(err)
			} else {
				let CommentAuthors = []
				if (project.comments.length != 0) {
					project.comments.forEach(function (comment) {
						User.findById(comment.author, function (err, User) {
							CommentAuthors.push(User.username)
							if (project.comments.length == CommentAuthors.length) {
								res.render("know_more.ejs",{project:project, CUsers:CommentAuthors})
							}
						})
					})
				} else {
					res.render("know_more.ejs",{project:project, CUsers:CommentAuthors})
			    }
		    }
	    })
}

module.exports = projectKnowMore;
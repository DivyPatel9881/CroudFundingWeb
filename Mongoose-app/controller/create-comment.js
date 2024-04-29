var Comment = require("../model/Comment.js")
var Project = require("../model/Project.js")

function createComment(req, res) {
	var sanitize = req.sanitize
	Project.findById(req.params.id, function(err, project) {
		var comment = new Comment({
			comment: sanitize(req.body.comment),
			author: req.user
		})
		Comment.create(comment,function(err, comment){
			project.comments.push(comment)
			project.save(function(err, project){
				if(err) {
					console.log(err)
				} else {
					res.redirect("/projects/know-more/" + req.params.id)
				}
			})
		})		
	})
}

module.exports = createComment;
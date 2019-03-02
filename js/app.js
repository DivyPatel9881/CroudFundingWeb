var express = require("express")
var mongoose =require("mongoose")
var bodyParser = require("body-parser")
var expressSanitizer = require("express-sanitizer")
var methodOverride = require("method-override")
var passport = require("passport")
var passportLocal = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var expressSession = require("express-session")
var User = require("./User.js")
var Project = require("./Project.js")
var Comment = require("./Comment.js")

var app = express()

app.set("views","./ejs")

app.use(express.static("./css"))
app.use(express.static("./js"))

app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSanitizer())
app.use(methodOverride("_method"))

passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(expressSession({
	secret:"qwerty",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(function(req,res,next){
	res.locals.user = req.user
	next()
})

mongoose.connect("mongodb://localhost:27017/CroudFunding",{useNewUrlParser:true})

app.get("/",function(req,res){
	res.send("Home page.")
})

app.get("/newproject",function(req,res){
	res.render("newproject.ejs")
})

app.post("/newproject",function(req,res){
	sanitize = req.sanitize
	description = sanitize(req.body.description)
	console.log(req.user)
	Project.create({
		name:req.body.name,
		category:req.body.category,
		description:description,
		photo:req.body.photo,
		video:req.body.video,
		goal:req.body.goal,
		author:req.user
	},function(err,project){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/")
		}
	})
})

app.get("/projects/:category",function(req,res){
	Project.find({category:req.params.category},function(err,projects){
		if(err){
			console.log(err)
		}
		else{
			res.render("categoryprojects.ejs",{projects:projects,category:req.params.category})
		}
	})
})

app.get("/projects/knowmore/:id",function(req,res){
	Project.findOne({_id:req.params.id}).populate([
		{path:"author"},
		{path:"comments",
		 populate:{path:"comments"}
		 }
		]).exec(function(err,project){
			if(err)
			{
				console.log(err)
			}
			else
			{
				let CommentAuthors = []
				if(project.comments.length != 0){
					project.comments.forEach(function(comment){
						User.findById(comment.author,function(err,User){
							CommentAuthors.push(User.username)
							if(project.comments.length == CommentAuthors.length)
							{
								res.render("knowmore.ejs",{project:project,CUsers:CommentAuthors})
							}
						})
					})
				}
				else{
					res.render("knowmore.ejs",{project:project,CUsers:CommentAuthors})
			}
		}
	})
})

app.post("/projects/comment/:id",function(req,res){
	var sanitize = req.sanitize
	Project.findById(req.params.id,function(err,project){
		var comment = new Comment({
			Comment:sanitize(req.body.comment),
			author:req.user
		})
		Comment.create(comment,function(err,comment){
			Project.comments.push(comment)
			Project.save(function(err,project){
				if(err)
				{
					console.log(err)
				}
				else
				{
					res.redirect("/projects/knowmore/"+req.params.id)
				}
			})
		})		
	})
})

app.get("/register/details",function(req,res){
	res.render("reg_details.ejs")
})

app.get("/register/signup",function(req,res){
	res.render("registration.ejs")
})

var flag=0
var fullname=""
var phone=""
var aadharnum=""
var gender = ""

app.get("/login",function(req,res){
	res.render("login.ejs")
})

app.get("/logout",isLoggedIn,function(req,res){
	req.logout()
	//req.flash("success","Logged You out.")
	res.redirect("/")
})

app.post("/register/details",isLoggedOut,function(req,res){
	fullname = req.body.fullname
	phone = req.body.phone
	aadharnum = req.body.aadharnum
	gender=req.body.gender
	User.find({aadharNum:aadharnum},function(error,user){
		if(error){
			console.log(error)
		}
		else if(user[0]==undefined)
		{
			flag=1
			res.redirect("/register/signup")
		}
		else{
			console.log("User already exists.")
			res.redirect("/register/details")
		}
	})
})

app.post("/register/signup",isLoggedOut,function(req,res){
	User.find({emailId:req.body.email},function(err,user){
		if(err){
			console.log(err)
		}
		else if(user[0]==undefined){
			var newUser = new User({
				fullname:fullname,
				phone:phone,
				aadharNum:aadharnum,
				gender:gender
				,emailId:req.body.email,
				username: req.body.username
			});
			User.register(newUser,req.body.password,function(err,user){
				if(err)
				{
					console.log(err)
					res.redirect("/register/signup")
				}
				else{
					passport.authenticate("local")(req,res,function(){
						//req.flash("success","Registered successfully")
						res.redirect("/")
					})
				}
			})
		}
		else{
			res.redirect("/register/signup")
		}
	})
})

app.post("/login",isLoggedOut,passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login",
	//failureFlash:"Cannot login you",
	//successFlash:"Successfully Logged you in"
}),function(req,res){
})

function isLoggedIn(req,res,next){
	if(req.user){
		next()
	}
	else{
		//req.flash("error","Login Required.")
		res.redirect("/login")
	}
}

function isLoggedOut(req,res,next){
	if(!req.user){
		next()
	}
	else{
		//req.flash(failure,"Logout Required.")
		res.redirect("/")
	}
}

var server = app.listen("3000","127.0.0.1",function(){
	console.log("Server is Running.")
	console.log(server.address().port+" "+server.address().address)
})
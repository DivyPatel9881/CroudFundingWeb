var express = require("express")
var mongoose =require("mongoose")
var bodyParser = require("body-parser")
var expressSanitizer = require("express-sanitizer")
var methodOverride = require("method-override")
var passport = require("passport")
var passportLocal = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var expressSession = require("express-session")
var User = require("./model/User.js")

var createProject = require("./controller/create-project.js")
var getProjects = require("./controller/get-projects.js")
var projectKnowMore = require("./controller/project-know-more.js")
var createComment = require("./controller/create-comment.js")
var renderPledge = require("./controller/render-pledge.js")
var pledge = require("./controller/pledge.js")
var registerDetails = require("./controller/register-details.js")
var signup = require("./controller/signup.js")

var app = express()

app.set("views","./view/ejs")

app.use(express.static("./view/css"))
app.use(express.static("./view/assets"))
app.use(express.static("./controller/lib"))
app.use(express.static("./view/ejs"))

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

mongoose.connect("mongodb://localhost:27017/CroudFunding",{useNewUrlParser:true, useUnifiedTopology:true})

app.get("/",function(req, res){
	res.render("home.ejs")
})

app.get("/create-project", isLoggedIn, function(req, res){
	res.render("create_project.ejs")
})

app.post("/create-project", isLoggedIn, createProject)

app.get("/projects/:category", getProjects)

app.get("/projects/know-more/:id", projectKnowMore)

app.post("/projects/comment/:id", isLoggedIn, createComment)

app.get("/pledge/:id", isLoggedIn, renderPledge)

app.post("/pledge/:id", isLoggedIn, pledge)

app.get("/register/details", isLoggedOut, function(req, res){
	res.render("registration_details.ejs")
})

app.get("/register/signup", isLoggedOut, function(req, res){
	res.render("registration.ejs")
})

app.get("/login", isLoggedOut, function(req, res) {
	res.render("login.ejs")
})

app.get("/logout", isLoggedIn, function(req, res) {
	req.logout()
	// req.flash("success","Logged You out.")
	res.redirect("/")
})

app.post("/register/details", isLoggedOut, registerDetails)

app.post("/register/signup", isLoggedOut, signup)

app.post("/login", isLoggedOut, passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login",
	// failureFlash:"Cannot login you",
	// successFlash:"Successfully Logged you in"
}), function(req, res){
})

function isLoggedIn(req, res, next){
	if (req.user) {
		next()
	} else {
		//req.flash("error","Login Required.")
		res.redirect("/login")
	}
}

function isLoggedOut(req, res, next) {
	if (!req.user) {
		next()
	} else {
		//req.flash(failure,"Logout Required.")
		res.redirect("/")
	}
}

var server = app.listen("3000", "127.0.0.1", function() {
	console.log("Server is Running.")
	console.log(server.address().port + " " + server.address().address)
})
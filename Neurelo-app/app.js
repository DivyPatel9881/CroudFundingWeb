var express = require("express")
var bodyParser = require("body-parser")
var expressSanitizer = require("express-sanitizer")
var methodOverride = require("method-override")
var expressSession = require("express-session")

var createProject = require("./controller/create-project.js")
var { getProjects } = require("./controller/get-projects.js")
var projectKnowMore = require("./controller/project-know-more.js")
var createComment = require("./controller/create-comment.js")
var renderPledge = require("./controller/render-pledge.js")
var pledge = require("./controller/pledge.js")

var app = express()

app.set("views","./view/ejs")

app.use(express.static("./view/css"))
app.use(express.static("./view/assets"))
app.use(express.static("./controller/lib"))
app.use(express.static("./view/ejs"))

app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSanitizer())
app.use(methodOverride("_method"))

app.use(expressSession({
	secret:"qwerty",
	resave:false,
	saveUninitialized:false
}))

app.get("/",function(req, res){
	res.render("home.ejs")
})

app.get("/create-project", function(req, res){
	res.render("create_project.ejs")
})

app.post("/create-project", createProject)

app.get("/projects/:category", getProjects)

app.get("/projects/know-more/:id", projectKnowMore)

app.post("/projects/comment/:id", createComment)

app.get("/pledge/:id", renderPledge)

app.post("/pledge/:id", pledge)

app.get("/register/details", function(req, res){
	res.render("registration_details.ejs")
})

app.get("/register/signup", function(req, res){
	res.render("registration.ejs")
})

app.get("/login", function(req, res) {
	res.render("login.ejs")
})

app.get("/logout", function(req, res) {
	res.redirect("/")
})

var server = app.listen("3001", "127.0.0.1", function() {
	console.log("Server is Running.")
	console.log(server.address().port + " " + server.address().address)
})
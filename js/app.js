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

app.get("/:category",function(req,res){
	
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

app.post("/register/details",isLoggedOut,function(req,res){
	fullname = req.body.fullname
	phone = req.body.phone
	aadharnum = req.body.aadharnum
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
	if(flag==1)
	{	
		User.register(new User({fullname:fullname,phone:phone,aadharNum:aadharnum,username:req.body.email}),req.body.password,function(err,user){
			if(err)
			{
				console.log(err)
				res.redirect("/register/signup")
			}
			else{
				passport.authenticate("local")(req,res,function(){
					//req.flash("success","Registered successfully")
					console.log(authenticated)
					res.redirect("/")
				})
			}
		})
	}else{
		res.redirect("/register/details")
	}
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
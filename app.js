var express             =require('express'),
 app                    =express(),
 bodyparser             =require('body-parser'),
 passport               =require('passport'),
 passportLocalMongoose  =require('passport-local-mongoose'),
 LocalStrategy          =require('passport-local'),
 Campground             =require('./models/campground'),
 mongoose               =require('mongoose'),
 flash                  =require('connect-flash'),
  seedDB                 =require('./seeds2'),
 Comment                =require('./models/comment'),
 User                   =require('./models/users')
var commentRoutes      =require('./routes/comments'),
    campgroundRoutes   =require('./routes/campgrounds'),
    authRoutes         =require('./routes/auth');
var methodOverride     =require('method-override');

mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser:true});

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


app.use(flash());
seedDB();//seed the database


//PASSPORT CONFIG
app.use(require('express-session')({
  secret:"Once hkh,hkshkhakfssf",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.curuser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
})


app.use(authRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.listen(process.env.PORT,process.env.IP,function(err){
  if(err){
    console.log("Errrrrrr");
  }
  else{
    console.log("YelpCamp is Running");
  }
});

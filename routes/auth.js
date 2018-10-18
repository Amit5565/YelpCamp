var express=require('express');
var router=express.Router();
var passport=require('passport');
var User  =require('../models/users');



router.get("/",function(req,res){
  res.render("landing");
})


//===========
//AUTH ROUTES
//===========

router.get("/register",function(req,res){
  res.render("register");
})

router.post("/register",function(req,res){

  var newUser=new User({username:req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err)
    {
       req.flash("error",err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req,res,function(){
       req.flash("success","Welcome To Yelpcamp "+user.username);
      res.redirect("/campgrounds")
    })
  });
})


//LOGIN page

router.get("/login",function(req,res){
  res.render("login");
})

//Handling login
router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(err,res) {

})


//LogOut
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged U Out!!!")
  res.redirect("/campgrounds");
})




module.exports=router;

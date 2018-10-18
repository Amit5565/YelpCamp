//all the middleware goes here
var Campground=require('../models/campground');
var Comment    =require('../models/comment');
var middlewareObj={};
middlewareObj.checkCampgroundOwnerShip=function(req,res,next){
    //is user logged
    if (req.isAuthenticated()) {

      var id = req.params.id;
      Campground.findById(id, function(err, campground) {
        if (err) {
          req.flash("error","Campground not Found")
          res.redirect("back");
        } else {
          //does user own the campground??
          if(campground.author.id.equals(req.user._id)){
             next();
          }
          else{
            req.flash("You don't have permission to do that");
            res.redirect("back");
          }

        }
      })
    } else {
       req.flash("error","You need to be logged in to do that");
      res.redirect("back");
    }
  }


middlewareObj.checkCommentOwnerShip=function(req,res,next){
    //is user logged
    if (req.isAuthenticated()) {

      var id = req.params.comment_id;
      Comment.findById(id, function(err, comment) {
        if (err) {
          req.flash("error","Comment not Found");
          res.redirect("back");
        } else {
          //does user own the campground??
          if(comment.author.id.equals(req.user._id)){
             next();
          }
          else{
            req.flash("error","You do not have permission to do that");
            res.redirect("back");
          }

        }
      })
    } else {
      req.flash("You need to be looged in to do that");
      res.redirect("back");
    }
}


middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    else{
      req.flash("error","You need to be logged in to do that ");
      res.redirect("/login");
    }

}
module.exports=middlewareObj;

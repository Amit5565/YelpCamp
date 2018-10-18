var express=require('express');
var router =express.Router({mergeParams:true});
var Campground=require('../models/campground');
var Comment  =require('../models/comment');
var middleware  =require('../middleware/index.js');
//========================
//COMMENT ROUTES
//========================



//Comments New
router.get("/new",middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log("Error in comments/new");
    }
    else{
       res.render("comments/new",{campground:campground});
    }
  })

})

//COMMENT POST ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
  //finding the id to which comment needs to be added
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds")
    }
    else{
      //creating comments
      Comment.create(req.body.comment,function(err,formcomment){
        if(err){
          req.flash("error","Something went wrong");
          console.log("Error in creating comments");
        }
        else{

          //add username and id to comment
         formcomment.author.id=req.user._id;
         formcomment.author.username=req.user.username;
         //save comment
         formcomment.save();
          //pushing comments into campground
           campground.comments.push(formcomment);
           campground.save(function(err,campground){
             if(err){
               req.flash("error","Comment can't be added");
               console.log("Error in adding comments to campground");
             }
             else{
               req.flash("success","Successfully added comment");
               res.redirect("/campgrounds/"+campground._id);
             }
           })
        }
      })
    }
  })

})



//EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
  Comment.findById(req.params.comment_id,function(err,comment){
    if(err)
    {
      console.log("Error in editing comments");
      res.redirect("back");
    }
    else{

      res.render("comments/edit",{comment:comment,campground_id:req.params.id});
    }
  })
})


//Update Route
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatecomment){
  if(err)
  {
    console.log("Error in updating comments");
    res.redirect("back");
  }
  else{
    res.redirect("/campgrounds/"+req.params.id);
  }
  })
})


//Delete ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err)
    {
      console.log("Error in deleting comment");
      res.redirect("back");
    }
    else{
      req.flash("success","Comment Deleted");
      res.redirect("/campgrounds/"+req.params.id);
    }

  })
})

module.exports=router;

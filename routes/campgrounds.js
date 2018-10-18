var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware  =require('../middleware/index.js');
//INDEX-Displays all Campgrounds
router.get("/", function(req, res) {


  Campground.find({}, function(err, dbcamps) {
    if (err) {
      console.log("Error");
    } else {
      res.render("campgrounds/index", {
        campground: dbcamps,
        curuser: req.user
      });
    }
  })
})
//CREATE-Creates a new Campground
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.img;
  var desc = req.body.description;
  var price=req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var obj = {
    name: name,
    image: image,
    description: desc,
    price:price,
    author: author
  };
  Campground.create(obj, function(err) {
    if (err) {
      console.log("Error in post campgrounds");
    } else {
      console.log(obj);
      res.redirect("campgrounds");
    }
  })
})

//NEW- Show the form for creating Campgrounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/newcampground");
})

//SHOW ROUTE
router.get("/:id", function(req, res) {

  //find the campground with the given id
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log("Error in id request");
    } else {
      //render show template
      console.log(foundCampground);
      res.render("campgrounds/show", {
        campground: foundCampground
      });
    }
  });
})


//EDIT Router
router.get("/:id/edit",middleware.checkCampgroundOwnerShip, function(req, res) {

    var id = req.params.id;
    Campground.findById(id, function(err, campground) {
            res.render("campgrounds/edit", {
            campground: campground
          });
})
});

//Update ROUTE
router.put("/:id",middleware.checkCampgroundOwnerShip,function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcamp) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
})


//Delete Route

router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err, camground) {
    if (err) {
      res.redirect("/campgrounds/" + req.params.id);
    } else {
      res.redirect("/campgrounds");
    }
  })
})

module.exports = router

var mongoose=require('mongoose');
var Campground=require('./models/campground');
var Comment=require('./models/comment');


// var data=[
//   {
//     name:"Clouds Rest",
//     image:"https://images.unsplash.com/photo-1532511064565-b7df5ca32985?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef4159b4a60997737c8d0ae39b90b48b&auto=format&fit=crop&w=750&q=80",
//     description:"Bacon ipsum dolor amet t-bone swine pork ham ball tip alcatra landjaeger short ribs chicken jowl. Ham hock capicola meatloaf, shoulder pancetta turkey prosciutto filet mignon fatback doner spare ribs porchetta pork belly bacon frankfurter. Boudin tenderloin pig biltong fatback, pork chop bacon capicola jerky tail pancetta flank porchetta shoulder prosciutto. Ball tip ham hock salami, short loin t-bone bacon pork chop cupim capicola sausage jowl strip steak shoulder."
//   },
//
//   {
//     name:"Clouds Rest-2",
//     image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=750&q=80",
//     description:"Bacon ipsum dolor amet t-bone swine pork ham ball tip alcatra landjaeger short ribs chicken jowl. Ham hock capicola meatloaf, shoulder pancetta turkey prosciutto filet mignon fatback doner spare ribs porchetta pork belly bacon frankfurter. Boudin tenderloin pig biltong fatback, pork chop bacon capicola jerky tail pancetta flank porchetta shoulder prosciutto. Ball tip ham hock salami, short loin t-bone bacon pork chop cupim capicola sausage jowl strip steak shoulder."
//   },
//   {
//     name:"Clouds Rest-3",
//     image:"https://images.unsplash.com/photo-1528835333825-7dc1cee67e63?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=944a66e3473db6d1fda34029b072fc19&auto=format&fit=crop&w=749&q=80",
//     description:"Bacon ipsum dolor amet t-bone swine pork ham ball tip alcatra landjaeger short ribs chicken jowl. Ham hock capicola meatloaf, shoulder pancetta turkey prosciutto filet mignon fatback doner spare ribs porchetta pork belly bacon frankfurter. Boudin tenderloin pig biltong fatback, pork chop bacon capicola jerky tail pancetta flank porchetta shoulder prosciutto. Ball tip ham hock salami, short loin t-bone bacon pork chop cupim capicola sausage jowl strip steak shoulder."
//   }
// ]

function seedDB(){
  //Remove all campgrounds
Campground.remove({},function(err,res){
  if(err)
  {
    console.log("Error in remove");
  }
  else{
    console.log("Removed Campgrounds");
  }
})
}

// //add a few Campgrounds
// for(var i=0;i<data.length;i++)
// {
//     Campground.create(data[i],function(err,campground){
//       if(err)
//       {
//         console.log("Error in creating data");
//       }
//       else{
//         console.log("Added a campground");
//         //adding comments
//         Comment.create({
//           text:"This place is good,I wish it had internet",
//           author:"Amit"
//         },function(err,comment){
//           if(err)
//           {
//             console.log("Hey there is an err while adding comments");
//           }
//           else{
//             campground.comments.push(comment);
//             campground.save();
//             console.log("Created new comments");
//           }
//         })
//       }
//     })
// }

module.exports=seedDB;

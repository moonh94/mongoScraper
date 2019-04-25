
var express = require("express");
var router = require("express").Router();
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var app = express();

// var saveArticle = require("../public/javscript/public");
// This route renders the homepage
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/saved", function (req, res) {
  res.render("saved");
})

router.get("/scrape", function (req, res) {
  //   axios.get("https://www.nytimes.com").then(function(response) {
  //    // Load the HTML into cheerio and save it to a variable
  // // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  // var $ = cheerio.load(response.data);

  // // An empty array to save the data that we'll scrape
  // var results = [];

  // // Select each element in the HTML body from which you want information.
  // // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // // but be sure to visit the package's npm page to see how it works
  // $("article").each(function(i, element) {

  //   var title = $(element).children().text();
  //   var link = $(element).find("a").attr("href");

  //   // Save these results in an object that we'll push into the results array we defined earlier
  //   results.push({
  //     title: title,
  //     link: link
  //   });
  // });


  // Log the results once you've looped through each of the elements found with cheerio
  // console.log(results);
  //   console.log(res);
  // });
  //   });
  axios.get("http://www.echojs.com/").then(function (response) {

    var $ = cheerio.load(response.data);
    $("article h2").each(function (i, element) {

      var result = {};

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Article.create(result)
        .then(function (dbArticle) {

          console.log(dbArticle);
        })
        .catch(function (err) {

          console.log(err);
        });
    });

   res.send("scrape complete");
    console.log(result);
  });
});

// Route for getting all Articles from the db
router.get("/api/saved", function (req, res) {
  console.log("hi");
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (data) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(data);
      console.log(data);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


router.get("/saved/:id", function (req, res) {
  db.Article.findOne({ _id: req.params.id })
    .then(function (dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});




// // Route for saving/updating an Article's associated Note
// app.post("/saved/:id", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });




module.exports = router;
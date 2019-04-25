var express = require("express");
// var logger = require("morgan");
var routes = require("./routes");
//mongoose
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraperHomework"
mongoose.connect(MONGODB_URI);

//needed for handlebars
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3000;
var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// var axios = require("axios");
// var cheerio = require("cheerio");

var db = require("./models");

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

module.exports = app

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

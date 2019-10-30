var express = require("express");
//sets up html elements
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//helps us test routes
var logger = require("morgan");
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/recipes", { useNewUrlParser: true});

//do a create route to scrape
//do a get route for all 
//do an get route and findone / add note 
//do a post route to save note 

app.listen(PORT, function(){
    console.log(`App listening on Port: ${PORT}`);
});
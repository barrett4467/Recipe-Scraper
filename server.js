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
app.get("/scrape", function(req, res){
    axios.get("http://allrecipes.com/").then(function(response){
        var $ = cheerio.load(response.data);
        $("article.fixed-recipe-card").each(function(i, element) {

            var name = $(element).find("span.fixed-recipe-card__title-link").text().trim();
            var link = $(element).find("a").attr("href");
            var image = $(element).find("img").data("original-src");
            var description = $(element).find("div.fixed-recipe-card__description").text().trim();

            var recipes = {
                name: $(element).find("span.fixed-recipe-card__title-link").text().trim(),
                link: $(element).find("a").attr("href"),
                image: $(element).find("img").data("original-src"),
                description: $(element).find("div.fixed-recipe-card__description").text().trim()
            }
            console.log(recipes);
            db.Recipe.create(recipes)
            .then(function(dbRecipe){
                console.log(dbRecipe);
            })
            .catch(function(err){
                if (err) console.log(err);
            })
        });
        res.send("AllRecipes has been scraped!!");

    });
});
//do a get route for all 
app.get("/recipe", function(req, res){
    db.Recipe.find({})
    .then(function(recipe){
        res.json(recipe);
    }).catch(function(err){
        if (err) res.json(err);
    });
});
//do an get route and findone / add note 
//do a post route to save note 

app.listen(PORT, function(){
    console.log(`App listening on Port: ${PORT}`);
});
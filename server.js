var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//helps us test routes
var logger = require("morgan");
var db = require("./models");

var PORT = process.env.PORT || 8080;

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);


var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongoose.connect("mongodb://localhost/recipes", { useNewUrlParser: true});
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/recipes";

mongoose.connect(MONGODB_URI);

// heroku_4gjc89v7

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
            // db.Recipe.deleteMany()
            // .then(function(dbRecipes){
            //     console.log("Dropped!!");
            //     console.log(dbRecipes);
            // }).then(function(){
                
            // })
            db.Recipe.create(recipes)
            // db.Note.drop();
            // console.log(recipes);
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
        // console.log(recipe);
        var recipes= [];
        for (var i = 0; i < recipe.length; i ++){
            recipes.push(recipe[i]);
        }
        console.log("Recipe: " + recipes.length);//15

        var hbsObject= {
            recipe: recipes
        }
        console.log(hbsObject);
        res.json(recipe);
        // res.render("index");
    }).catch(function(err){
        if (err) res.json(err);
    });
});
app.post("/notes/:id", function(req, res){
    console.log(req.body);

    db.Note.create(req.body)
    .then(function(note){
       return db.Recipe.findOneAndUpdate({_id: req.params.id}, {$set: {note: note._id}}, {new: true}) 
    })
    .then(function(recipe){
        res.json(recipe);
    }).catch(function(err){
        if (err) res.json(err);
    })
});
app.get("/notes/:id", function(req, res){
    db.Recipe.findOne({_id: req.params.id})
    .populate("note")
    .then(function(note){
        res.json(note);
    }).catch(function(err){
        if (err) res.json(err);
    });
});
app.post("/recipe-box/:id", function(req, res){
    db.Recipe.findOneAndUpdate({_id: req.params.id},{$set: {saved: true}}, {new: true})
    .then(function(saved){
        res.json(saved);
    })
    .catch(function(err){
        if (err) res.json(err);
    })
});
app.get("/notes", function(req, res){
    db.Note.find({})
    .then(function(notes){
        console.log("This: ");
        console.log(notes);
        res.send(notes);
    });
});
app.post("recipe-box/:id", function(req, res){
    db.Recipe.findOneAndUpdate({_id: req.params.id}, {$set: {saved: false}})
    .then(function(deleted){
        res.json(deleted);
    }).catch(function(err){
        if (err) res.json(err);
    });
});
app.get("/recipe-box", function(req, res){
    db.Recipe.find({saved: true})
    .then(function(saved){
        console.log("Saved: ");
        console.log(saved);
        res.json(saved);
    })
})

app.listen(PORT, function(){
    console.log(`App listening on Port: ${PORT}`);
});
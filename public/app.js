$("#recipes").html("<p>There doesn't seem to be any Recipes</p>");
$("#recipes").append("<button class='scrape'>Get Recipes</button>");
$(".scrape").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    setTimeout(getRecipes(), 3000);
})

function getRecipes(){
    $.getJSON("/recipe", function(data){
        $("#recipes").html("<p>Give us just a moment to find the info</p>");
        
        for (var i = 0; i < data.length; i++){
            $("#recipes").append(`<div class="recipe" data-id=${data[i]._id}><img alt=${data[i].name} src=${data[i].image}><h3><a target="_blank" href="${data[i].link}">${data[i].name}</a></h3><p>${data[i].description}</p><button class= "add-notes" data-id=${data[i]._id}>Add Note</a></button><button class="save-recipe" data-save="false" data-id="${data[i]._id}">Save</button></div>`);
            
            if (data[i].note){
                $(".recipe").append(`<button class="view-notes" data-id=${data[i]._id} href="http://localhost:8080/scrape">View Notes</button>`);
            }
        }

        $(".add-notes").on("click", function(){
            $("<form action='/add-note' method='post'><h3>Feel Free to Add Your Notes</h3><label for='title'>Title:</label><input type='text' id='title'><label for='body'>Message:</label><input type='text' id='body'><button type='submit' class='submit'>submit</button></form>").modal();
            var id = $(this).data("id");
            console.log("ID: " + id);
            $(".submit").on("click", function(event){
                event.preventDefault();
                var newNote = {
                    title: $("#title").val().trim(),
                    body: $("#body").val().trim()
                }
                $.ajax({
                    method: "POST",
                    url: "/notes/" + id,
                    data: newNote
                })
                .then(function(note){
                    console.log(note);
                });
                console.log("New Note: " + newNote);
            });

        });

        $(".view-notes").on("click", function(){
            var id = $(this).data("id");
            $.ajax({
                method: "GET",
                url: "/notes/" + id,
            })
            .then(function(recipe){
                console.log("Recipe: ");
                console.log(recipe);

                $(`<h3>${recipe.note.title}: ${recipe.note.body}</h3>`).modal();
                
            })
        });
        $(".save-recipe").on("click", function(){
            var id = $(this).attr("data-id");
            console.log(id);
            console.log($(this));

            if ($(this).attr("data-save", false)){
                $(this).attr("data-save", true);
                $(this).text("Delete").attr("id", "delete-recipe");
            } else {
                $(this).attr("data-save", false);
                $(this).text("Save");  
            }

            if ($(this).text === "Delete"){
                $.ajax({
                    method: "POST",
                    url: "/recipe-box/" + id
                }).then(function(deleted){
                    $("<p>Deleted!</p>").modal();
                })
            } else {
                $.ajax({
                    method: "POST",
                    url: "/recipe-box/" + id
                }).then(function(saved){
                    $("<p>Saved!</p>").modal();
                });
            }



        });
        $(".recipe-box").on("click", function(){
            $.ajax({
                method: "GET",
                url: "/recipe-box"
            }).then(function(recipes){
                console.log(recipes);
                $(".recipes").empty();

                for (var i = 0; i < recipes.length; i++){
                    $("#recipes").append(`<div class="recipe" data-id=${recipes[i]._id}><img alt=${recipes[i].name} src=${recipes[i].image}><h3><a target="_blank" href="${recipes[i].link}">${recipes[i].name}</a></h3><p>${recipes[i].description}</p><button class= "add-notes" data-id=${recipes[i]._id}>Add Note</a></button><button class="save-recipe" data-id="${recipes[i]._id}">Save</button></div>`);
                    
                    if (data[i].note){
                        $(".recipe").append(`<button class="view-notes" data-id=${data[i]._id}>View Notes</button>`);
                    }
                }
            });
        });
    });
};


/* <div data-id="${data[i]._id}">
    <img scr="${data[i].image}"/>
    <h3>${data[i].title}</h3>
    <p>${data[i].link}</p>
    <p>${data[i].description}</p>
</div> */

// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg
// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg/
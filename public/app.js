$.getJSON("/recipe", function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++){
        $("#recipes").append(`<div class="recipe" data-id=${data[i]._id}><img alt=${data[i].name} src=${data[i].image}><h3><a target="_blank" href="${data[i].link}">${data[i].name}</a></h3><p>${data[i].description}</p><button class= "add-notes" data-id=${data[i]._id}>Add Note</a></button><button class="save-recipe" data-id="${data[i]._id}">Save</button></div>`);
        
        if (data[i].note){
            $(".recipe").append(`<button class="view-notes" data-id=${data[i]._id}>View Notes</button>`);
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
            url: "/notes/" + id
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
        this.attr("data-saved", true);

        $.ajax({
            method: "POST",
            url: "/recipe-box"
        })
    })
    
});


/* <div data-id="${data[i]._id}">
    <img scr="${data[i].image}"/>
    <h3>${data[i].title}</h3>
    <p>${data[i].link}</p>
    <p>${data[i].description}</p>
</div> */

// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg
// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg/
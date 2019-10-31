$.getJSON("/recipe", function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++){
        $("#recipes").append(`<div data-id=${data[i]._id}><img alt=${data[i].name} src=${data[i].image}><h3>${data[i].name}</h3><p>${data[i].link}</p><p>${data[i].description}</p><button class= "add-notes" data-id=${data[i]._id}>Add Note</a></button><button class="view-notes" data-id=${data[i]._id}>View Notes</button></div>`)
    }
    $(".add-notes").on("click", function(){
        $("<form><h3>Feel Free to Add Your Notes</h3><label for='title'>Title:</label><input type='text' name='title'><label for='body'>Message:</label><input type='text' name='body'><button type='submit'>sumbit</button></form>").modal();
        var id = $(this).data("id");
        console.log("ID: " + id);
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
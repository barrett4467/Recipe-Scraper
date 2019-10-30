$.getJSON("/recipe", function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++){
        $("#recipes").append(`<div data-id=${data[i]._id}><img alt=${data[i].name} src=${data[i].image}/><h3>${data[i].name}</h3><p>${data[i].link}</p><p>${data[i].description}</p></div> \n `)
    }
})

/* <div data-id="${data[i]._id}">
    <img scr="${data[i].image}"/>
    <h3>${data[i].title}</h3>
    <p>${data[i].link}</p>
    <p>${data[i].description}</p>
</div> */

// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg
// https://images.media-allrecipes.com/userphotos/300x300/2326066.jpg/
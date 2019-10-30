var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
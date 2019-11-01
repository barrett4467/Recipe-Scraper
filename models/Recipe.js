var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
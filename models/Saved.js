var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedSchema = new Schema ({
    saved: Boolean
});

var Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;
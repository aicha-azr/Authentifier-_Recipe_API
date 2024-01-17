const mongoose = require('mongoose');

const InterSchema = new mongoose.Schema({
    dishType: String,
    name: String,
    ingredients: [String],
    instructions: [String]
})
module.exports = mongoose.model('Recipes',InterSchema)
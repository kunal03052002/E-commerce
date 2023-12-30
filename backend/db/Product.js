const mongoose = require('mongoose');

const produtSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
});

module.exports = mongoose.model("products",produtSchema);
const mongoose = require('mongoose');

// Create a schema
const answerSchema = new mongoose.Schema({
    id: Number,
    answer: String,
});

// Create model
const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
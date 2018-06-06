const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionModel = new Schema({
    id: Number,
    question: String,
    idAfterYes: Number,
    idAfterNo: Number,
    typeAfterYes: String,
    typeAfterNo: String,
});


module.exports = mongoose.model('Question', questionModel);
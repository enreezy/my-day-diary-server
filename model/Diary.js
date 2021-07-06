const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiarySchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    sentiment: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
});

module.exports = Diary = mongoose.model('diary', DiarySchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subject_name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Subject", subjectSchema);
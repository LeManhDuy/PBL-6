const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    grade_name:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Grade',gradeSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    score_ratio:{
        type: Number,
        require: true
    },
    score:{
        type: Number,
        require: true
    },
    student_id:{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    subject_id:{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }
})
module.exports = mongoose.model('Score',scoreSchema)
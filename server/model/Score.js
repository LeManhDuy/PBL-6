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
    pupil_id:{
        type: Schema.Types.ObjectId,
        ref: 'Pupil'
    }
})
module.exports = mongoose.model('Score',scoreSchema)
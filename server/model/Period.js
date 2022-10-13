const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const periodSchema = new Schema({
    period_date:{
        type: String,
        require: true
    },
    period_number:{
        type: Number,
        require: true
    },
    subject_teacher_id:{
        type: Schema.Types.ObjectId,
        ref: 'SubjectTeacher'
    },
    schedule_id:{
        type: Schema.Types.ObjectId,
        ref: 'Schedule'
    }
})

module.exports = mongoose.model('Period',periodSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectTeacherSchema = new Schema({
    subject_id:{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    teacher_id:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

module.exports = mongoose.model('SubjectTeacher',subjectTeacherSchema)
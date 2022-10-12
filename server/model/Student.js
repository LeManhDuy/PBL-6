const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_name:{
        type: String,
        require: true
    },
    student_dateofbirth:{
        type: Date,
        require: true
    },
    student_gender:{
        type: Boolean,
        require: true
    },
    student_image:{
        type: String,
        require: true
    },
    parent_id:{
        type: Schema.Types.ObjectId,
        ref: 'Parent'
    },
    class_id:{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
})

module.exports = mongoose.model('Student', studentSchema)
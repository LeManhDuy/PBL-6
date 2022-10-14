const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
    class_name:{
        type: String,
        require: true
    },
    grade_id: {
        type: Schema.Types.ObjectId,
        ref: "Grade",
    },
    homeroom_teacher_id:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

module.exports = mongoose.model('Class',classSchema);
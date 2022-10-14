const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pupilSchema = new Schema({
    pupil_name:{
        type: String,
        require: true
    },
    pupil_dateofbirth:{
        type: Date,
        require: true
    },
    pupil_gender:{
        type: Boolean,
        require: true
    },
    pupil_image:{
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

module.exports = mongoose.model('Pupil', pupilSchema)
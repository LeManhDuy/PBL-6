const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_content :{
        type: String,
        require: true
    },
    student_id:{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
})

module.exports = mongoose.model('Comment',commentSchema)
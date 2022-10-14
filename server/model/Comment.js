const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_content :{
        type: String,
        require: true
    },
    pupil_id:{
        type: Schema.Types.ObjectId,
        ref: 'Pupil'
    }
})

module.exports = mongoose.model('Comment',commentSchema)
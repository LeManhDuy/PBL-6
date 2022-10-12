const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateNotificationSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    parent_id:{
        type: Schema.Types.ObjectId,
        ref: 'Parent'
    },
    teacher_id:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
})

module.exports = mongoose.model('PrivateNofitication',privateNotificationSchema)
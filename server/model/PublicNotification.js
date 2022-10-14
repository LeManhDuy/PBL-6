const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicNotificationSchema = new Schema({
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
    }
})

module.exports = mongoose.model('PublicNotification', publicNotificationSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    class_id:{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }
})

module.exports = mongoose.model('Schedule',scheduleSchema)
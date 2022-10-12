const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    person_id:{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    parent_job:{
        type: String,
        require: true
    },
    parent_relationship:{
        type: String,
        require: true
    },
    is_in_association:{
        type: Boolean,
        require: true
    },
    parent_job_address:{
        type: String
    }
})

module.exports = mongoose.model('Parent',parentSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    person_id:{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    graduated_school:{
        type: String,
        require: true
    },
    working_since:{
        type: Date,
        require: true
    },
    certificate:{
        type: String
    }
})

module.exports = mongoose.model('Teacher',teacherSchema)
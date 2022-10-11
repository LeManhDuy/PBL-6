const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    person_fullname: {
        type: String,
        required: true,
    },
    person_dateofbirth: {
        type: Date,
        required: true,
    },
    person_email: {
        type: String,
        required: true,
    },
    person_gender: {
        type: Boolean,
        require: true,
        default: false,
    },
    person_phonenumber: {
        type: String,
        required: true,
    },
    person_address: {
        type: String,
        required: true,
    },
    person_image: {
        type: String,
        require: true,
    },
    account_id: {
        type: Schema.Types.ObjectId,
        ref: "Account",
    },
});

module.exports = mongoose.model("Person", personSchema);

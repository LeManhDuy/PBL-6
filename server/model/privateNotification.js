const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrivateNotificationSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "Parent",
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
    teacher_send: {
        type: Schema.Types.Boolean,
        default: false,
    },
    parents_send: {
        type: Schema.Types.Boolean,
        default: false,
    },
});

module.exports = mongoose.model(
    "PrivateNofitication",
    PrivateNotificationSchema
);

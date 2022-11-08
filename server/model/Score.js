const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    midterm_score: {
        type: Number,
        require: true,
    },
    final_score: {
        type: Number,
        require: true,
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
    },
    pupil_id: {
        type: Schema.Types.ObjectId,
        ref: "Pupil",
    },
});
module.exports = mongoose.model("Score", scoreSchema);

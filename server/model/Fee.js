const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    fee_status: {
        type: Boolean,
        require: true
    },
    paid_date: {
        type: Date,
    },
    fee_category_id: {
        type: Schema.Types.ObjectId,
        ref: 'FeeCategory'
    },
    pupil_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pupil'
    }
})

module.exports = mongoose.model('Fee', feeSchema)

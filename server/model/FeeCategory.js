const mongoose = require("mongoose");

const feeCategorySchema = new mongoose.Schema({
    fee_name:{
        type: String,
        require: true
    },
    fee_amount:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('FeeCategory',feeCategorySchema)
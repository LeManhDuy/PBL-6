const mongoose = require("mongoose");

const feeCategorySchema = new mongoose.Schema({
    fee_name:{
        type: String,
        require: true
    },
    fee_amount:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('FeeCategory',feeCategorySchema)
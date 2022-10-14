const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    account_username: {
        type: String,
        required: true,
    },
    account_password: {
        type: String,
        required: true,
    },
    account_role: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Account", accountSchema);

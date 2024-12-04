const mongoose = require("mongoose");

const whitelistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    max_time: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Whitelist", whitelistSchema);
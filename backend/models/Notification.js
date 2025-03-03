const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/notifications", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Message Schema
const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);

// WebSocket Connection
wss.on("connection", (ws) => {
    console.log("✅ New WebSocket Connection Established");

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data);
        console.log(`📩 Received from ${parsedData.sender}: ${parsedData.content}`);

        // Save message to MongoDB
        const newMessage = new Message(parsedData);
        await newMessage.save();

        // Broadcast message to all connected clients (mobile & emulator)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedData));
            }
        });
    });

    ws.on("close", () => {
        console.log("❌ WebSocket Disconnected");
    });
});

// API Route to Fetch Messages
app.get("/messages", async (req, res) => {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
});

// Start Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

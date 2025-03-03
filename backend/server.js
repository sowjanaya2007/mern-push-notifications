require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

// Debugging: Check if .env variables are loaded
console.log("🔍 Debug: MONGO_URI =", process.env.MONGO_URI);
console.log("🔍 Debug: PORT =", process.env.PORT);

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// WebSocket Server Setup (Socket.io)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust if frontend runs elsewhere
        methods: ["GET", "POST"],
    },
});

// Handle WebSocket Events
io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    socket.on("send_notification", (data) => {
        io.emit("receive_notification", data);
        console.log("📢 Notification Sent:", data);
    });

    socket.on("disconnect", () => {
        console.log("❌ User Disconnected:", socket.id);
    });
});

// Import API Routes
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/notifications", notificationRoutes);

// Define the Port
const PORT = process.env.PORT || 5000;

// Start Express Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

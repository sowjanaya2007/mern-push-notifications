import React, { useState } from "react";
import { sendNotification } from "../services/notificationService";
import { io } from "socket.io-client";
import "./SendNotification.css"; // Import the CSS file

const socket = io("http://localhost:5000");

const SendNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        if (!title || !message) {
            alert("Please enter both title and message!");
            return;
        }

        await sendNotification(title, message);
        socket.emit("send_notification", { title, message });
        setTitle("");
        setMessage("");
    };

    return (
        <div className="send-notification-container">
            <h2 className="title">📤 Send a Notification</h2>
            <div className="form-container">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter title..." 
                    className="input-box"
                />
                <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Enter message..." 
                    className="input-box textarea"
                />
                <button onClick={handleSend} className="send-btn">Send</button>
            </div>
        </div>
    );
};

export default SendNotification;

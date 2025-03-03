import React, { useState } from "react";
import { sendNotification } from "../services/notificationService";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const SendNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        await sendNotification(title, message);
        socket.emit("send_notification", { title, message });
        setTitle("");
        setMessage("");
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default SendNotification;

import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import { io } from "socket.io-client";
import "./Notifications.css"; // Import the CSS file

const socket = io("http://localhost:5000");

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();

        // Listen for new notifications via WebSockets
        socket.on("receive_notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
        });

        return () => socket.off("receive_notification");
    }, []);

    const fetchNotifications = async () => {
        const data = await getNotifications();
        setNotifications(data);
    };

    return (
        <div className="notifications-container">
            <h2 className="title">📩 Notifications</h2>
            <div className="notifications-list">
                {notifications.map((note, index) => (
                    <div key={index} className="chat-bubble">
                        <div className="chat-content">
                            <h3>{note.title}</h3>
                            <p>{note.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;

import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();

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
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((note, index) => (
                    <li key={index}>
                        <strong>{note.title}</strong>: {note.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;

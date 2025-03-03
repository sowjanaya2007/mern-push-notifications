import axios from "axios";

const API_URL = "http://localhost:5000/notifications";

export const getNotifications = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
};

export const sendNotification = async (title, message) => {
    try {
        await axios.post(API_URL, { title, message });
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Importing CSS file

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">📢 Push Notification System</h1>
            <nav className="nav-menu">
                <ul>
                    <li>
                        <Link to="/send-notification" className="chat-box">
                            <div className="chat-content">
                                <h3>📤 Send Notification</h3>
                                <p>Click here to send a message</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notifications" className="chat-box">
                            <div className="chat-content">
                                <h3>📩 View Notifications</h3>
                                <p>Check received notifications</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;

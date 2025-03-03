import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Notifications from "../src/pages/Notifications";
import SendNotification from "../src/pages/SendNotification";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/send-notification" element={<SendNotification />} />
            </Routes>
        </Router>
    );
};

export default App;

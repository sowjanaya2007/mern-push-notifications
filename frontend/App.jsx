import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Waiting for connection...");
    const [message, setMessage] = useState("");
    const [device, setDevice] = useState("Mobile"); // Default: Mobile, change to "Emulator" if running on Emulator
    const ws = useRef(null);

    // Monitor Internet Connection
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    // WebSocket Connection
    useEffect(() => {
        ws.current = new WebSocket("ws://192.168.2.120:5000"); // Change to your backend server IP

        ws.current.onopen = () => {
            setStatusMessage("✅ Connected to WebSocket Server");
        };

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [receivedMessage, ...prevMessages]);
        };

        ws.current.onerror = () => {
            setStatusMessage("❌ WebSocket Error");
        };

        ws.current.onclose = () => {
            setStatusMessage("❌ WebSocket Disconnected");
        };

        return () => ws.current.close();
    }, []);

    // Send Message
    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({
                sender: device,
                receiver: device === "Mobile" ? "Emulator" : "Mobile",
                content: message
            });
            ws.current.send(data);
            setMessage("");
        } else {
            console.log("❌ WebSocket not connected");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📩 Messaging System</Text>
            <Text style={styles.status}>{statusMessage}</Text>
            <Text style={styles.connection}>Internet Status: {isConnected ? "🌍 Online" : "🚫 Offline"}</Text>

            {/* Device Selector */}
            <Text>Device Type:</Text>
            <Button title="📱Mobile" onPress={() => setDevice("Mobile")} />
            <Button title="📵Emulator" onPress={() => setDevice("Emulator")} />

            {/* Message Input */}
            <Text>Message:</Text>
            <TextInput style={styles.input} placeholder="Type a message..." onChangeText={setMessage} value={message} />

            {/* Send Button */}
            <Button title="Send Message" onPress={sendMessage} />

            {/* Messages List */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.notification}>
                        <Text style={styles.sender}>{item.sender} → {item.receiver}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "pink" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    status: { fontSize: 18, marginBottom: 10, color: "green" },
    connection: { fontSize: 16, marginBottom: 10, color: "blue" },
    input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
    notification: { marginTop: 10, padding: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
    sender: { fontWeight: "bold", color: "blue" },
});

export default App;

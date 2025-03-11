import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📨 Message Sent Successfully!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 22, fontWeight: "bold", color: "green" },
});

export default Message;

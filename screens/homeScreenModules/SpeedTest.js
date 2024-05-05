import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';

const SpeedTest = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { sender: "user", message: message }]);
    
    setMessage("");
  };

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Internet Speed Test</Text>
        </View>
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: 'https://fast.com/' }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  titleText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
  },
  webviewContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: width * 0.05,
  },
  webview: {
    flex: 1,
  },
});

export default SpeedTest;

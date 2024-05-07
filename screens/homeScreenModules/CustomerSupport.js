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

const CustomerSupport = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { sender: "user", message: message }]);
    
    setMessage("");
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: 'https://tawk.to/chat/6639f2b09a809f19fb2e3bdf/1ht95o1h3' }}
          />
        </View>
      </SafeAreaView>
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
  webviewContainer: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    borderColor: "#ccc",
    overflow: "hidden",
  },
  webview: {
    flex: 1,
  },
});

export default CustomerSupport;

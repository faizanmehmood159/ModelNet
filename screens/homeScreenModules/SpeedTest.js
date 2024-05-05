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
        <View style={styles.titleContainer}><Text>.</Text>
        </View>
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: 'https://fast.com/' }}
          />
        </View>
        <View style={styles.footerContainer}><Text>.</Text>
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
    zIndex: 10,
    backgroundColor: "white",
    height: height * 0.2,
    width: width ,
    position: "absolute",
  },
  
  footerContainer: {
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "white",
    height: height * 0.5,
    width: width ,
    position: "absolute",
    bottom:0
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
  },
  webview: {
    flex: 1,
    height:100
  },
});

export default SpeedTest;

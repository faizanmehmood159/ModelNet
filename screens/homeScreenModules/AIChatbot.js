import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { speak, stop, isSpeakingAsync } from "expo-speech";
import Color from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AIChatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const API_KEY = "AIzaSyDZho2QET6QahxMVeyl57hFbV53WELTs8c";

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      { role: "user", parts: [{ text: userInput + " this query is about internet." }] },
      
    ];
    setLoading(true);
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
  
      const modelResponse =
        response.data?.candidates[0]?.content?.parts?.[0]?.text || "";
      if (modelResponse) {
        const updateChatWithModel = [
          ...updatedChat,
          { role: "model", parts: [{ text: modelResponse }] },
        ];
        setChat(updateChatWithModel);
        await handleSpeech(modelResponse);
      }
  
      setUserInput("");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", paddingTop:40 }}
        >
          {chat.map((message, index) => (
            <View key={index} style={{ paddingHorizontal: 10 }}>
              <View>
                {message.role === "user" ? (
                  <View
                    className=" rounded-lg flex w-full"
                    style={{ alignItems: "flex-end" }}
                  >
                    <FontAwesome5 name="user-circle" size={32} color="black" />
                  </View>
                ) : (
                  <Image
                    source={require("../../assets/AIChatbot.png")}
                    size={32}
                    color={Color.Primary}
                    style={styles.icon}
                  />
                )}
              </View>
              <View
                style={{
                  alignItems:
                    message.role === "user" ? "flex-end" : "flex-start",
                  marginVertical: 3,
                  marginHorizontal: 12,
                }}
              >
                <View
                  className="shadow-lg shadow-orange-400"
                  style={{
                    backgroundColor:
                      message.role === "user" ? "#2B8CFF" : "#b8ba8f",
                    padding: 10,
                    borderTopLeftRadius: message.role === "user" ? 32 : 0,
                    borderTopRightRadius: message.role === "user" ? 0 : 32,
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32,
                  }}
                >
                  <Text
                    style={{ color: message.role === "user" ? "#fff" : "#000" }}
                  >
                    {message.parts[0].text}
                  </Text>
                  {message.role === "model" && (
                    <View style={{ flexDirection: "row", marginTop: 5, justifyContent:"space-between" }}>
                      <Text></Text>
                      <TouchableOpacity
                        onPress={() => handleSpeech(message.parts[0].text)}
                        style={{backgroundColor: "#fff", padding: 8, borderRadius: 50,}}
                      >
                       <FontAwesome5 name="volume-up" size={14} color="black" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
          {loading && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <ActivityIndicator size="small" color="#FFA001" />
            </View>
          )}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#000",
              color: "#000",
              borderRadius: 10,
              padding: 8,
            }}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type your message..."
          />
          <TouchableOpacity
            className="shadow-sm shadow-orange-400"
            style={{
              marginLeft: 10,
              backgroundColor: "#fff",
              padding: 12,
              borderRadius: 50,
            }}
            onPress={handleUserInput}
            disabled={!userInput.trim()}
          >
            <FontAwesome5 name="paper-plane" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AIChatbot;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 50,
    alignItems: "center",
    alignContent: "center",
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 0,
  },
  nameText: {
    color: "orange",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 30,
    letterSpacing: -0.5,
  },
  undernameText: {
    color: Color.Primary,
    fontSize: 10,
    marginLeft: 10,
    marginBottom: -20,
  },
  logoImage: {
    width: 100,
    height: 70,
    marginLeft: 80,
    marginTop: -5,
    marginBottom: 100,
  },
  page: {
    marginTop: -130,
  },
  inputSection: {
    marginTop: 20,
    marginHorizontal: 30,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 13,
    left: 15,
  },
  passworshowicon: {
    position: "absolute",
    top: 13,
    right: 25,
  },
  icon: {
    width: 48,
    height: 48,
  },
  input: {
    fontSize: 15,
    height: 50,
    width: 320,
    marginLeft: 0,
    marginRight: 30,
    borderWidth: 1,
    paddingLeft: 45,
    paddingRight: 50,
    borderRadius: 10,
  },
  underline: {
    height: 0,
  },
  login: {
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 5,
    width: "55%",
    height: 40,
    backgroundColor: Color.Primary,
  },
  logintxt: {
    marginTop: 7,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  loginview: {
    alignItems: "center",
  },
  signup: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signuptext: {
    color: "red",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Color.Primary,
  },
  or: {
    marginHorizontal: 5,
  },
  errormessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },

  uploadButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginLeft: 40,
    alignItems: "center",
    width: 300,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 310,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginLeft: 20,
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const AIChatbot = () => {
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";

  const handleSend = async () => {
    try {
      const prompt = textInput;
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      console.log("API Response Status:", response.status);
      console.log("API Response Data:", response.data);
  
      const text = response.data.choices[0].text;
      setData([
        ...data,
        { type: "user", text: textInput },
        { type: "bot", text: text },
      ]);
      setTextInput("");
    } catch (error) {
      console.error("Error sending request to OpenAI API:", error.message);
      // You can add further error handling or user feedback here
    }
  };
  

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.titlecontainer}>
          <Image
            style={styles.image}
            source={require("../../assets/AIChatbot.png")}
          />
          <Text style={styles.titletext}>AI Chatbot</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={styles.body}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", padding: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: item.type === "user" ? "green" : "red",
                }}
              >
                {item.type === "user" ? "Ninza" : "Bot"}
              </Text>
              <Text style={styles.bot}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter text here..."
            value={textInput}
            onChangeText={(text) => setTextInput(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Text style={styles.buttonText}>Sent</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    
  },

  titlecontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:60,
    marginLeft:80,
  },

  image: {
    height: 60,
    width: 60,
  },

  titletext: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },

  body: {
    width: "100%",
    marginVertical: 10,
  },

  bot: {
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth:1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AIChatbot;

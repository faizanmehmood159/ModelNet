import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Color from "../../constants/Colors";

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState("");  
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
  };

  const sendOTP = async () => {
    try {

      if (!email.trim()) {
        setErrorMessage('Please enter your email address');
        return;
      }

      if (!isValidEmail(email)) {
        setErrorMessage('Please enter a valid email address');
        return;
      }

      const response = await axios.post(
        "http://192.168.100.8:8000/api/v1/auth/sendOtp",
        { email }
      );

      if (!response.data.success) {
        setErrorMessage('Please Failed the Field');
      }

      Alert.alert("Success", response.data.message || "OTP sent successfully");
      navigation.navigate("ResetPassword");
    } 
    catch (error) {
      setErrorMessage('Email not exist');
    }
  };

  return (
    <SafeAreaView style={styles.LP}>
      <LinearGradient
        colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Send Verification Code</Text>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Text>Enter your email address.</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={sendOTP}
            >
              <Text style={{ color: "#fff" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LP: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: Color.Secondary,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Color.Primary,
  },

  input: {
    height: 40,
    backgroundColor: "white",
    borderColor: Color.Primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },

  button: {
    backgroundColor: Color.Primary,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',

  }
});

export default Forgot;

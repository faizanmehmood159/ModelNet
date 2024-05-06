
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Color from "../../constants/Colors";

const Forgot = ({ navigation }) => {
  const[email, setEmail] = useState("");

  const sendOTP = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/api/v1/auth/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }
  
      const responseData = await response.json();
  
      
      Alert.alert('Success', responseData.message || 'OTP sent successfully');
      navigation.navigate('ResetPassword');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
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
});

export default Forgot;

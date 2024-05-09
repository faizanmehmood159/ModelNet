import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../constants/Colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewInstallation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const handleInstallationFormSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !phone_no.trim() ||
        !cnic.trim() ||
        !address.trim()
      ) {
        Alert.alert("Validation Error", "All fields are required");
        return;
      }

      const data = {
        name: name,
        email: email,
        phone_no: phone_no,
        cnic: cnic,
        address: address,
      };
      const response = await axios.post(
        "http://192.168.1.9:8000/api/v1/auth/installationForm",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Installation form submitted successfully");
        setName("");
        setEmail("");
        setPhoneNo("");
        setCnic("");
        setAddress("");
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Failed to submit installation form");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit installation form. Please try again later."
      );
    }
  };

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.title}>Installation Form</Text>

            {/* Name Input */}
            <View>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            {/* Email Input */}
            <View>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>

            {/* Phone Number Input */}
            <View>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone_no}
                onChangeText={(text) => setPhoneNo(text)}
                keyboardType="phone-pad"
              />
            </View>

            {/* CNIC Input */}
            <View>
              <Text style={styles.inputLabel}>CNIC</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your CNIC"
                value={cnic}
                onChangeText={(text) => setCnic(text)}
                keyboardType="numeric"
              />
            </View>

            {/* Address Input */}
            <View>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, { height: 75 }]}
                placeholder="Enter your Address"
                multiline
                numberOfLines={5}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleInstallationFormSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NewInstallation;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: 5,
  },

  container: {
    marginTop: 100,
    paddingHorizontal: 20,
  },

  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputLabel: {
    color: Color.Primary,
    fontSize: 18,
    marginBottom: 5,
  },

  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  disabled: {
    backgroundColor: "#f0f0f0",
    color: "#888",
  },

  submitButton: {
    backgroundColor: Color.Primary,
    paddingTop: 10,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    width: 230,
    alignSelf: "center",
  },

  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

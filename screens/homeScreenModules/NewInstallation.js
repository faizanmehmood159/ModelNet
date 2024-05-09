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
import RNPickerSelect from "react-native-picker-select";

const NewInstallation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_no, setPhoneNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const packages = [
    { id: 1, label: "6MB ", price: 1700 },
    { id: 2, label: "10MB ", price: 2200 },
    { id: 3, label: "15MB ", price: 2500 },
  ];

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
      const selectedPackageObj = packages.find(pkg => pkg.label === selectedPackage);
      const data = {
        name: name,
        email: email,
        phone_no: phone_no,
        cnic: cnic,
        address: address,
        packages: selectedPackageObj,
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
        setSelectedPackage(null);
        navigation.navigate("Home");
      } else {
        console.error("Error", "Failed to submit installation form", error);
        Alert.alert("Error", "Failed to submit installation form");
      }
    } catch (error) {
      console.error("Error submitting installation form:", error);
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
            <View style={styles.selectedPackagecontainer}>
              <Text style={styles.inputLabel}>Choose Packages:</Text>
              <View style={styles.input}>
                <RNPickerSelect
                  onValueChange={(value, index) => {
                    setSelectedPackage(value);
                    setSelectedId(packages[index].id);
                  }}
                  items={packages.map((pkg) => ({
                    label: pkg.label,
                    value: pkg.label, // Set value property to match the label
                  }))}
                  placeholder={{ label: "Select a package...", value: null }}
                  value={selectedPackage}
                  style={styles.pickerSelect}
                />
              </View>
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
    marginTop: 20, // Adjust this margin to provide space below the dropdown
  },

  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  pickerSelect: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    marginBottom: 12,

    Packagecontainer: {
      height: 50,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 12,
    },
  },
});

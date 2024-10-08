import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterComponent = () => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setphone_no] = useState('');
  const [complaint, setComplaint] = useState('');

  const navigation = useNavigation();

  const handleComplaintSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !phone_no.trim() ||
        !complaint.trim()
      ) {
        Alert.alert("Validation Error", "All fields are required");
        return;
      }
  
      const data = {
        name: name,
        email: email,
        phone_no: phone_no,
        complaint: complaint,
      };
      const response = await axios.post(
        "http://192.168.140.237:8000/api/v1/auth/registerComplaint",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        Alert.alert("Success", "Complaint submitted successfully");
        setName("");
        setEmail("");
        setphone_no("");
        setComplaint("");
        navigation.navigate('Home');
      } else {
        Alert.alert("Error", "Failed to submit Complaint");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit Complaint. Please try again later."
      );
    }
  };
  


  // const handleComplaintSubmit = () => {
  //   if (!id || !name || !email || !phone_no || !complaint) {
  //     Alert.alert('Error', 'Please fill in all fields');
  //     return;
  //   }

  //   // Send complaint data to the backend
  //   fetch('http://192.168.140.237:8000/api/v1/auth/registerComplaint', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id,
  //       name,
  //       email,
  //       phone_no,
  //       complaint,
  //     }),
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   })
  //   .then(data => {
  //     Alert.alert('Success', 'Complaint registered successfully');
  //     navigation.navigate('Home');
  //   })
  //   .catch(error => {
  //     Alert.alert('Error', `Failed to register complaint: ${error.message}`);
  //   });
  // };
  

  return (
    <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>

            {/* Title: Register Complaint */}
            <Text style={styles.title}>Register Complaint</Text>

            {/* Title: Name Input */}
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            {/* Title: Email Input */}
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />

            {/* Title: Phone Number Input */}
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone number"
              value={phone_no}
              onChangeText={(text) => setphone_no(text)}
              keyboardType="phone-pad"
            />

            {/* Title: Complaint Input */}
            <Text style={styles.inputLabel}>Complaint</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Enter your complaint here..."
              multiline
              numberOfLines={5}
              value={complaint}
              onChangeText={(text) => setComplaint(text)}
            />

            {/* Title: Submit Button */}
            <TouchableOpacity onPress={handleComplaintSubmit} style={styles.submitButton} >
              <Text style={styles.submitButtonText}>Submit Complaint</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterComponent;

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
    marginTop:20,
    fontSize: 25,
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
  },    

  inputLabel: {
    color: Color.Primary,
    fontSize: 18,
    marginBottom: 5,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  submitButton: {
    backgroundColor: Color.Primary,
    paddingTop: 10,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    width: 230, 
    alignSelf: 'center', 
  },

  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

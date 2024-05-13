import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Color from '../../constants/Colors';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangeName = () => {
  const [newName, setNewName] = useState('');
  const [newPhoneNo, setNewPhoneNo] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formValid, setFormValid] = useState(true);

  const handleChangeName = async () => {
    if (!newName || !newPhoneNo) {
      setFormValid(false);
      return;
    }

    setFormValid(true);

    // Phone number validation
    const phoneRegex = /^(03|9)\d{9}$/;
    if (!phoneRegex.test(newPhoneNo)) {
      setPhoneError('Invalid phone number');
      return;
    }

    setPhoneError(''); // Clear phone number error if validation passes

    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.patch(
        'http://192.168.1.3:8000/api/v1/auth/changeName',
        { newName, newPhoneNo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to change name');
      }
    } catch (error) {
      // console.error('ERROR', error.message);
      // Alert.alert('Error', 'Failed to change name. Please try again later.');
    }
  };

  return (
    <LinearGradient
      colors={['#EAECC6', '#E7E9BB', '#2BC0E4']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Text style={styles.title}>Change Name</Text>
          <View>
          {!formValid && <Text style={styles.errorMessage}>Name and phone number are required.</Text>}
            <Text style={styles.label}>New Name</Text>
            <TextInput
              style={[styles.input, !formValid && !newName && styles.errorInput]}
              placeholder="Enter your new name"
              value={newName}
              onChangeText={text => setNewName(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>New Phone Number</Text>
            <TextInput
              style={[styles.input, !formValid && !newName && styles.errorInput]}
              placeholder="Enter your new phone number"
              value={newPhoneNo}
              onChangeText={text => setNewPhoneNo(text)}
            />
          </View>
          {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleChangeName}>
            <Text style={styles.buttonText}>Change Name</Text>
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
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 150,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: 320,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: 'red', // Change border color to red for error
  },
  button: {
    backgroundColor: Color.Primary,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default ChangeName;

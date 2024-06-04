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
import { Ionicons } from '@expo/vector-icons';
import Color from '../../constants/Colors';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // State to toggle confirm new password visibility
  const navigation = useNavigation();

  const toggleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Check if new password is at least 8 characters long
    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New password and confirm new password do not match.');
      return;
    }
  
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.post(
        'http://192.168.140.237:8000/api/v1/auth/changePassword',
        { oldPassword, newPassword, confirmNewPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      if (response.data.success) {
        // Show success message in alert
        Alert.alert('Success', 'Password changed successfully.', [{ text: 'OK', onPress: () => navigation.navigate('Profile') }]);
      } else {
        if (response.data.errorCode === "Invalid Details") {
          setErrorMessage(response.data.errorMessage);
        } else {
          setErrorMessage('Failed to change password');
        }
      }
    } catch (error) {
      setErrorMessage('Current Password in Incorrect.');
    }
  };
  

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Change Password</Text>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Current Password"
                secureTextEntry={!showOldPassword}
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
              /><View style={styles.passworshowicon}>
              <TouchableOpacity onPress={toggleShowOldPassword}>
                <FontAwesome
                  name={showOldPassword  ? "eye-slash" : "eye"}
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            
            
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter New Password"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
              <View style={styles.passworshowicon}>
              <TouchableOpacity onPress={toggleShowNewPassword}>
                <FontAwesome
                  name={showNewPassword ? "eye-slash" : "eye"}
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
           
                       </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry={!showConfirmNewPassword}
                value={confirmNewPassword}
                onChangeText={text => setConfirmNewPassword(text)}
              />
              <View style={styles.passworshowicon}>
              <TouchableOpacity onPress={toggleShowConfirmNewPassword}>
                <FontAwesome
                  name={showConfirmNewPassword   ? "eye-slash" : "eye"}
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
           
           
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
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
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: 280,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 10,
    alignSelf: 'center',
  },
  passworshowicon: {
    position: "absolute",
    top: 13,
    right: 25,
  },
});

export default ChangePassword;

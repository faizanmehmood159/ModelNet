import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import Color from '../../constants/Colors';

const ResetPassword = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const resetPassword = async () => {
    try {
      const response = await fetch('Yhttp://192.168.100.2:3000/api/v1/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, newPassword }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Password reset successfully');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'Failed to reset password');
    }
  };
  
    return (
      <SafeAreaView style={styles.LP}>
        <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Reset Your Password</Text>
              <Text>Enter your code here</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
              />
              <Text>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={setNewPassword}
              />
             
              <TouchableOpacity style={styles.button} onPress={resetPassword}>
                <Text style={{ color: '#fff' }}>Send</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: Color.Secondary,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.Primary,
  },

  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: Color.Primary,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
  },

  resend:{
    flexDirection:'row',
    paddingBottom:10
  },
  resendtext:{
    color: 'red'
  },

  button: {
    backgroundColor: Color.Primary,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default ResetPassword;

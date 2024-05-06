import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../../constants/Colors';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext as named export

const ChangeName = () => {
  const { token } = useContext(AuthContext);
  const [newName, setNewName] = useState('');
  const handleChangeName = async () => {
    try {
      const response = await fetch('http://192.168.1.3:8000/api/v1/auth/changeName', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newName }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        const errorMessage = errorData.message || 'Failed to change name';
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      // Handle success
      Alert.alert('Success', data.message);
    } catch (error) {
      // Handle error
      console.error('ERROR', error.message);
      Alert.alert('Error', error.message);
    }
  };
  
  
  

  return (
    <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Text style={styles.title}>Change Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new name"
            value={newName}
            onChangeText={text => setNewName(text)}
          />
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
  input: {
    height: 50,
    width: 320,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
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
});

export default ChangeName;

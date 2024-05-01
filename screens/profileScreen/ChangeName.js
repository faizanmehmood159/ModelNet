import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../../constants/Colors'

const ChangeName = () => {


  return (
    <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Text style={styles.title}>Change Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new name"
          />
          <TouchableOpacity style={styles.button} >
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
    // height: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',

  },
});

export default ChangeName;

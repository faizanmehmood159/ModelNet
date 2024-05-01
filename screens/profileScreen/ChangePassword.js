import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Color from '../../constants/Colors'
const ChangePassword = () => {
  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Change Password</Text>
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.button}>
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
  },
  inputSection: {
    marginVertical: 10,
    
  },
  input: {
    borderColor: "black",
    marginVertical:5,
    fontSize: 15,
    height: 50,
    width: 320,
    borderWidth:1,
    marginVertical:10,
    borderRadius:10,
    paddingHorizontal: 10,

  },

  button: {
    backgroundColor: Color.Primary,
    paddingTop: 10,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    width: 230, 
    alignSelf: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  
});

export default ChangePassword;

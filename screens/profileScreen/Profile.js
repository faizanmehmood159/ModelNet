import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const { signOut, token } = useContext(AuthContext); // Assuming you have a token in your AuthContext

  const selectProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access the photo library to set profile picture.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
  
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
        setBase64Image(result.assets[0].base64); 
      } else {
        setProfileImage(result.uri);
        setBase64Image(result.base64); // Set the base64 representation of the selected image
      }
    }
  };

  const uploadProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', base64Image);
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post('http://192.168.1.8:8000/api/v1/auth/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include bearer token
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Profile image uploaded successfully!');
      } else {
        throw new Error('Failed to upload profile image');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={selectProfileImage}>
              <View style={styles.profileBackground}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <Text style={styles.uploadText}>Select Profile Image</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("ChangeName")}>
              <Text style={styles.text}>Change Name</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")}>
              <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
              <Text style={styles.text}>F&Q</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={handleSignOut}>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
          </View>
          {profileImage && (
            <TouchableOpacity onPress={uploadProfileImage}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Upload Profile</Text>
              </View>
            </TouchableOpacity>
          )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -80,
  },
  profileBackground: {
    alignItems: "center", 
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    overflow: "hidden",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
  },
  uploadText: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
  textContainer: {
    borderBottomWidth: 2,
    borderColor: "white",
    borderRadius: 14,
    width: 350,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: "black",
    padding: 10,
    marginLeft: 20,
  },
});

export default Profile;

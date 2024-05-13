import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null); // State variable for userId

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const data = await AsyncStorage.getItem("userData");

      const userData = JSON.parse(data);
      setUserData(userData);
      setToken(token);
      setUserId(userData.id); 
    } catch (error) {
      console.error("Error retrieving token and user ID:", error);
    }
  };

  useEffect(() => {  
    getToken();
  }, []);

  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Denied", "Please allow access to the camera roll to upload an image.");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        const formData = new FormData();
        formData.append('profileImage', { 
          uri: pickerResult.uri,
          name: `profile_image_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });

        console.log("Image data:", formData); // Log the image data before sending
        
        const response = await axios.post(`http://192.168.1.3:8000/api/v1/auth/upload/?userId=${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, 
          },
        });
        
        // Set the uploaded image URL to display
        setProfileImage(response.data.image.imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "An error occurred while uploading the image.");
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
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileBackground}>
                <Text style={styles.uploadText}>Upload Profile Image</Text>
              </View>
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
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
  },
  uploadText: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#2BC0E4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    fontSize: 18,
    color: "white",
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

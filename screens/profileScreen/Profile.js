import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const { signOut, userToken } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfileImage(); // Fetch profile image on component mount
  }, []);

  const getProfileImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('profileImage');
      if (imageUri) {
        setProfileImage(imageUri);
      }
    } catch (error) {
      console.error("Error fetching profile image: ", error);
    }
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
      saveProfileImage(result.uri);
    }
  };

  const saveProfileImage = async (imageUri) => {
    let base64Image = await convertImageToBase64(imageUri);
  
    try {
      const formData = new FormData();
      formData.append('profileImage', base64Image);
      
      const response = await axios.post('http://192.168.1.5:8000/api/v1/auth/upload', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      console.log("Image uploaded successfully:", response.data);
  
      await AsyncStorage.setItem('profileImage', imageUri);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64String = await blobToBase64(blob);
    return base64String;
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
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
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleChoosePhoto} style={styles.profileBackground}>
                <Text style={styles.uploadText}>Upload Profile Picture</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Choose Photo</Text>
          </TouchableOpacity>
          
          {/* Other profile options */}
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
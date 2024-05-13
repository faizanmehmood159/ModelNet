import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"; 
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
<<<<<<< HEAD
  const { signOut, userToken } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfileImage(); // Fetch profile image on component mount
  }, []);

  const getProfileImage = async () => {
    // Fetch profile image from AsyncStorage or your database
=======

  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.1.3:8000/api/v1/auth/getLoggedInUserName', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUserName(response.data.data.name); // Set the user's name
      } else {
        console.error('Failed to fetch user name:', response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const profileImage = userName ? userName.charAt(0).toUpperCase() : ''; // Get the first letter of the user's name




  const { signOut } = useContext(AuthContext);
  // const [profileImage, setProfileImage] = useState(null);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null); // State variable for userId
console.log(userData)
  const getToken = async () => {
>>>>>>> 8bad7dd317d799d62602f9695c481758418597c0
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

    if (!result.canceled) {
      setProfileImage(result.uri);
      saveProfileImage(result.uri);
    }
  };

  const saveProfileImage = async (imageUri) => {
    // Convert image to base64 string
    let base64Image = await convertImageToBase64(imageUri);
  
    // Send base64Image to your backend server and store it in the database
    try {
      // Example: Sending base64Image to your backend API
      console.log('Sending image data:', base64Image);
      const formData = new FormData();
      formData.append('profileImage', base64Image);
      
      const response = await axios.post('http://192.168.38.237:8000/api/v1/auth/upload', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });
  
      console.log("Image uploaded successfully:", response.data);
  
      // Store the image URI locally for future use
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
<<<<<<< HEAD
            {profileImage ? (
              <TouchableOpacity onPress={handleChoosePhoto}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleChoosePhoto} style={styles.profileBackground}>
                <Text style={styles.uploadText}>Upload Profile Picture</Text>
              </TouchableOpacity>
            )}
=======
                  <Text style={styles.profileText}>{profileImage}</Text>
               
>>>>>>> 8bad7dd317d799d62602f9695c481758418597c0
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
    justifyContent: "center",
    marginTop: -80,
    backgroundColor: "#00AED1",
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  profileBackground: {
    alignItems: "center", 
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    overflow: "hidden",
  },
  profileText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 75,
    borderWidth: 5,
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

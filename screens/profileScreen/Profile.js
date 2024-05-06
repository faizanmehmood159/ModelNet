import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../context/AuthContext";
const Profile = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const { signOut } = useContext(AuthContext);


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setProfileImage(selectedImage.uri);
      setBase64Image(selectedImage.base64);
    }
  };
  

  const uploadProfilePicture = async () => {
    try {
      const response = await fetch('http://192.168.1.3:3000/images/upload-profile-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();
      const uploadedImageURI = data.imageURI;
      setProfileImage(uploadedImageURI);

      Alert.alert('Success', 'Profile picture uploaded successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload profile picture');
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
            <View style={styles.profileBackground}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Image source={require("../../assets/Faizan.png")} style={styles.profileImage} />
              )}
            </View>
          </View>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.uploadText}>Upload Profile Picture</Text>
          </TouchableOpacity>
          <Button title="Upload Picture" onPress={uploadProfilePicture} disabled={!base64Image} />
          
          {/* Your other profile options */}
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

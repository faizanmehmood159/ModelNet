import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Color from "../constants/Colors";

function SocialMedia() {
  const [pressedIcon, setPressedIcon] = useState(null);

  const handleIconPress = (socialMedia) => {
    // Handle icon press based on the social media type (e.g., 'facebook', 'google', 'apple')
    console.log(`Icon pressed: ${socialMedia}`);
    setPressedIcon(socialMedia);
    // Add any additional logic or navigation here
  };

  return (
    <View style={styles.MediaLogin}>
      <View style={styles.socialMediaLogin}>
        <Text style={styles.text}>Sign in with other accounts</Text>
        <View style={styles.iconContainer}>
          <TouchableHighlight
            style={[
              styles.iconWrapper,
              pressedIcon === "facebook" && styles.iconPressed,
            ]}
            onPress={() => handleIconPress("facebook")}
          >
            <Icon name="facebook" size={30} color="#3b5998" style={styles.icon} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[
              styles.iconWrapper,
              pressedIcon === "google" && styles.iconPressed,
            ]}
            onPress={() => handleIconPress("google")}
          >
            <Icon name="google" size={30} color="#4285F4" style={styles.icon} />
          </TouchableHighlight>

          
        </View>
      </View>
    </View>
  );
}

export default SocialMedia;

const styles = StyleSheet.create({
  MediaLogin: {
    alignItems: "center",
  },

  socialMediaLogin: {
    alignItems: "center",
  },

  text: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.Primary,
    marginTop:150,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    
  },
  iconWrapper: {
    borderRadius: 20,
    marginHorizontal: 20,
    borderWidth: 1,  
    borderColor: '#000',  
    padding: 5, 
  },
  iconPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  icon: {
    marginHorizontal: 30,
    
  },
});

import React from "react";
import { StyleSheet, Text } from "react-native";
import Color from "../constants/Colors";

function Title({ children, signupTitle = false }) {
  return (
    <Text style={[styles.heading, signupTitle && styles.signupTitle]}>
      {children}
    </Text>
  );
}

export default Title;

const styles = StyleSheet.create({
  heading: {
    paddingLeft: 15,
    marginTop: 50,
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 40,
    color: Color.Primary,
  },
  signupTitle: {
    // Additional styles for signupTitle if needed
  },
});

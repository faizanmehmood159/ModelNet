import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Color from "../constants/Colors";
import Title from "../components/Title";
import axios from 'axios';
import { useGlobalLoader } from "../components/loader/GlobalLoaderProvider";

const Signup = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    name: "",
    phone_no: "",
    email: "",
    password: "",
    image: null,
  });
  const { showLoader, hideLoader } = useGlobalLoader();

  const [errmessage, setErrmessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateNumber = (text) => {
    // Regular expression to validate phone numbers starting with +92 and having 10 digits
    const phoneRegex = /^\+92\d{10}$/;
    return phoneRegex.test(text);
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  const Sendtobackend = async () => {
    
    const userData = {
      name: fdata.name,
      phone_no: fdata.phone_no,
      email: fdata.email,
      password: fdata.password,
    };
  
    if (
      !userData.name ||
      !userData.phone_no ||
      !userData.email ||
      !userData.password
    ) {
      setErrmessage("All fields are required");
      return;
    }
  
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userData.email)) {
      setErrmessage("Please enter a valid email");
      return;
    }

    if (!validateNumber(fdata.phone_no)) {
      setErrmessage("Please enter a valid phone number (starting with +92 and 10 digits)");
      return;
    }
  
    if (userData.password.length < 8) {
      setErrmessage("Password must be at least 8 characters");
      return;
    }
  
    try {
      showLoader();
      const response = await axios.post("http://192.168.140.237:8000/api/v1/auth/signup", userData);
      const data = response.data;
      
      if (data.error) {
        if (data.error.includes("User already exists")) {
          setErrmessage("User already exists. Please sign in or use a different email.");
        } else {
          setErrmessage(data.error);
        }
      } else {
        Alert.alert("Signup Successful.  ", data.message);
        setErrmessage(null);
        navigation.navigate("Login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || "Bad Request. Please check your input data.";
        setErrmessage(errorMessage);
      } else {
        setErrmessage("Error signing up. Please try again.");
      }
    } finally {
      hideLoader();
    }
  };
  


  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>ModelNet</Text>
              <Text style={styles.undernameText}>
                Internet Service Provider
              </Text>
            </View>
            <Image
              source={require("../assets/Logo.png")}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.page}>
            
            <Title>Sign Up</Title>
            {errmessage ? (
              <Text style={styles.errormessage}>{errmessage}</Text>
            ) : null}
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={(text) => setFdata({ ...fdata, name: text })}
              />
              <View style={styles.underline} />
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="user"
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Phone Number (+92xxxxxxxxx)"
                onChangeText={(text) => setFdata({ ...fdata, phone_no: text })}
              />
              <View style={styles.underline} />
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="phone"
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="abcd@gmail.com"
                onChangeText={(text) => setFdata({ ...fdata, email: text })}
              />
              <View style={styles.underline} />
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="envelope"
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                textContentType="password"
                secureTextEntry={!showPassword}
                placeholder="Password"
                onChangeText={(text) => setFdata({ ...fdata, password: text })}
              />
              <View style={styles.passworshowicon}>
                <TouchableOpacity onPress={toggleShowPassword}>
                  <FontAwesome
                    name={showPassword ? "eye-slash" : "eye"}
                    size={24}
                    color={Color.Primary}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.underline} />
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="lock"
                  size={24}
                  color={Color.Primary}
                  style={styles.icon}
                />
              </View>
            </View>

            

            <View style={styles.loginview}>
              <TouchableOpacity onPress={Sendtobackend} style={styles.login}>
                <Text style={styles.logintxt}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.or}> or </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.signup}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signuptext}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 50,
    alignItems: "center",
    alignContent: "center",
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 0,
  },
  nameText: {
    color: "orange",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 30,
    letterSpacing: -0.5,
  },
  undernameText: {
    color: Color.Primary,
    fontSize: 10,
    marginLeft: 10,
    marginBottom: -20,
  },
  logoImage: {
    width: 100,
    height: 70,
    marginLeft: 80,
    marginTop: -5,
    marginBottom: 100,
  },
  page: {
    marginTop: -130,
  },
  inputSection: {
    marginTop: 20,
    marginHorizontal: 30,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 13,
    left: 15,
  },
  passworshowicon: {
    position: "absolute",
    top: 13,
    right: 25,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    fontSize: 15,
    height: 50,
    width: 320,
    marginLeft: 0,
    marginRight: 30,
    borderWidth: 1,
    paddingLeft: 45,
    paddingRight: 50,
    borderRadius: 10,
  },
  underline: {
    height: 0,
  },
  login: {
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 5,
    width: "55%",
    height: 40,
    backgroundColor: Color.Primary,
  },
  logintxt: {
    marginTop: 7,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    fontSize: 20,
  },
  loginview: {
    alignItems: "center",
  },
  signup: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signuptext: {
    color: "red",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Color.Primary,
  },
  or: {
    marginHorizontal: 5,
  },
  errormessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },

  uploadButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginLeft: 40,
    alignItems: "center",
    width: 300,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 310,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginLeft: 20,
  },
});

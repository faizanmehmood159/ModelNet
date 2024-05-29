import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ToastAndroid,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../constants/Colors";
import Title from "../components/Title";
import { useGlobalLoader } from "../components/loader/GlobalLoaderProvider";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { showLoader, hideLoader } = useGlobalLoader();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendToBackend = async () => {

   

    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      showLoader();
      const response = await axios.post("http://192.168.100.5:8000/api/v1/auth/signin", {
        email,
        password
      });
      // console.log(response.data)
      if(response.data.success === true){
        // console.log(response.data.message)
      }

      if (response.data.success === true) {
        const userData = response.data.data
        const stringifyData = JSON.stringify(userData);
        await AsyncStorage.setItem("userData",stringifyData);
        // console.log(response.data)
        signIn(response.data.data.token);
        showToast("Welcome.", ToastAndroid.SHORT);
      }
       else {
        if (data.description === "Incorrect password.") {
          setErrorMessage("Credential Error");
          showToast("Credential Error", ToastAndroid.LONG);
        } else if (data.description === "Email not found") {
          setErrorMessage("Email not found");
          showToast("Email not found", ToastAndroid.LONG);
        } else {
          setErrorMessage("Credential Error");
          showToast("Invalid email or password", ToastAndroid.LONG);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorret Credentials");
        showToast("Incorret Credentials", ToastAndroid.LONG);
      } else if (error.message === "Invalid email format" || error.message === "Password must be at least 6 characters long" || error.message === "Email and password are required") {
        setErrorMessage(error.message);
        showToast(error.message, ToastAndroid.LONG);
      } else {
        setErrorMessage("Network request failed");
        showToast("Network request failed", ToastAndroid.LONG);
      }
    } finally {
      hideLoader();
    }
  };

  const showToast = (message, duration) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
      Color.Success
    );
  };


  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.textcontainer}>
            <Text style={styles.nameText}>ModelNet</Text>
            <Text style={styles.undernameText}>Internet Service Provider</Text>
          </View>
          <Image
            source={require("../assets/Logo.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.titletext}>
          <Title style={styles.titletext}>Login</Title>
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <View style={styles.page}>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="abcd@gmail.com"
              onChangeText={(text) => setEmail(text)}
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
              textContentType="password"
              secureTextEntry={!showPassword}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
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
            <View style={styles.iconContainer}>
              <FontAwesome
                name="lock"
                size={24}
                color={Color.Primary}
                style={styles.icon}
              />
            </View>
            <View style={styles.underline} />
          </View>

          <View style={styles.loginview}>
            <TouchableOpacity style={styles.login} onPress={sendToBackend}>
              <Text style={styles.logintxt}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fp}>
            <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
              <Text style={styles.fp}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.or}> or </Text>
            <View style={styles.line} />
          </View>

          <View style={styles.signup}>
            <Text>Don't have an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signuptext}> Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 50,
    height: 110,
    alignItems: "center",
    alignContent: "center",
  },
  gradient: {
    flex: 1,
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
  titletext: {},
  page: {},
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
    paddingLeft: 45,
    paddingRight: 50,
    borderRadius: 10,
    borderWidth: 1,
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
    fontWeight: "bold",
    fontSize: 20,
  },
  loginview: {
    alignItems: "center",
  },
  fp: {
    marginTop: 7,
    alignItems: "center",
    color: "red",
  },
  message: {
    color: "green",
    textAlign: "center",
    marginTop: 10,
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
  errorMessage: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 10,
  },
});


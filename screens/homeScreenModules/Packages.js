import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { buyPackage } from "../../api/packages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const packages = {
  packages: [
    {
      name: "Basic Package",
      description:
        "Ideal for light internet users with basic browsing and email needs.",
      speed: "6 Mbps",
      data_limit: "Unlimited",
      price: "1700 Rs/month",
      url: "https://buy.stripe.com/test_5kA28F3A51cp7PqbIJ",
      bg: "#52b69a",
    },
    {
      name: "Standard Package",
      description:
        "Suitable for average internet usage including streaming and social media.",
      speed: "10 Mbps",
      data_limit: "Unlimited",
      price: "2200 Rs/month",
      url: "https://buy.stripe.com/test_dR67sZ7Qlf3ffhS7su",
      bg: "#ff6f61",
    },
    {
      name: "Premium Package",
      description:
        "Perfect for heavy internet users with high-speed requirements",
      speed: "15 Mbps",
      data_limit: "Unlimited",
      price: "2500 Rs/month",
      url: "https://buy.stripe.com/test_eVa28F8UpbR34De3cf",
      bg: "#ffcc5c",
    },
  ],
};

const Packages = () => {
  const [token, setToken] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const data = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(data);
      setUserData(userData);
      setToken(token);
    } catch (error) {}
  };
  useEffect(() => {
    getToken();
  }, []);

  const handlePackagePress = async (url) => {
    // Linking.openURL(url);
    if (url == "https://buy.stripe.com/test_5kA28F3A51cp7PqbIJ") {
      try {
        const body = {
          userId: userData.id,
          packages: {
            id: 1,
            label: "6 Mbps",
            price: 1700,
          },
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL(url);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (url == "https://buy.stripe.com/test_dR67sZ7Qlf3ffhS7su") {
      try {
        const body = {
          userId: userData.id,
          packages: {
            id: 2,
            label: "10 Mbps",
            price: 2200,
          },
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL(url);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (url == "https://buy.stripe.com/test_eVa28F8UpbR34De3cf") {
      try {
        const body = {
          userId: userData.id,
          packages: {
            id: 3,
            label: "15 Mbps",
            price: 2500,
          },
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL(url);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {packages.packages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.packageContainer, { backgroundColor: item.bg }]}
            onPress={() => handlePackagePress(item.url)}
          >
            <Text style={styles.packageName}>{item.name}</Text>
            <Text style={styles.packageDescription}>{item.description}</Text>
            <View style={styles.detail}>
              <Text style={styles.packageDetail}>Speed: {item.speed}</Text>
              <Text style={styles.packageDetail}>
                Data Limit: {item.data_limit}
              </Text>
            </View>
            <Text style={styles.packagePrice}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  detail: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  packageContainer: {
    width: width - 40,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  packageName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  packageDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#fff",
  },
  packageDetail: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Packages;

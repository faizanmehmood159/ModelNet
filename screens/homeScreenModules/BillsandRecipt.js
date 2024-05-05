import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from "react-native";
import Color from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const BillsScreen = () => (
  <LinearGradient
    colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
    style={styles.gradient}
  >
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ModelNet Bill</Text>
          <Text style={styles.subtitle}>Your Trusted Broadband Partner</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <Text>Account Number: 987654321</Text>
          <Text>Customer Name: User</Text>
          <Text>Address: Your Address, City</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <Text>Bill Month: February 2024</Text>
          <Text>Due Date: February 15, 2024</Text>
          <Text>Total Amount: $60.00</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Package Details</Text>
          <Text>Package Name: ModelNet Smart </Text>
          <Text>Speed: 50 Mbps</Text>
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Pay Bill</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for choosing ModelNet!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </LinearGradient>
);

const ReceiptScreen = () => (
  <LinearGradient
    colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
    style={styles.gradient}
  >
    <SafeAreaView style={styles.safeAreaView}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Receipt</Text>
        <Text style={styles.subtitle}>Thank you for your payment!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction Information</Text>
        <Text>Transaction ID: 123456789</Text>
        <Text>Date: February 15, 2024</Text>
        <Text>Amount Paid: 2000.00</Text>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>Duration: 1 Month</Text>
        <Text>Speed: 10 Mbps</Text>
      </View>

      
    </ScrollView>
    </SafeAreaView>
  </LinearGradient>
);

const Tab = createMaterialTopTabNavigator();

const BillsandReceipt = () => {
  return (
    <LinearGradient
      colors={["#EAECC6", "#E7E9BB", "#2BC0E4"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
         
<Tab.Navigator
  screenOptions={{
    tabBarIndicatorStyle: { backgroundColor: "black" },
    tabBarStyle: {
      marginTop: 28,
      height: 60,
      backgroundColor: "transparent",
    },
    tabBarLabelStyle: { fontSize: 20, fontWeight: "bold" },
  }}
>
  <Tab.Screen name="Bills" component={BillsScreen} />
  <Tab.Screen name="Receipt" component={ReceiptScreen} />
</Tab.Navigator>

        </ScrollView>
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
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },

  scrollViewContent: {
    marginTop: 50,
    flexGrow: 1,
  },

  container: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555555",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },

  submitButton: {
    backgroundColor: Color.Primary,
    paddingTop: 10,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    width: 230,
    alignSelf: "center",
  },

  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    marginTop: 70,
    borderTopWidth: 1,
    paddingTop: 5,
    alignItems: "center",
  },
  footerText: {
    color: "#555555",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default BillsandReceipt;

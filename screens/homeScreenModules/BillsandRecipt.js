import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import { bill, buyPackage, fetchBill } from "../../api/packages";

const BillsAndReceipt = () => {
  const [bills, setBills] = useState([]);
  const [billTopPay, setBillToPay] = useState(null);
  console.log(billTopPay, "billTopPay");
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("bills");

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab]);

  const fetchData = async (tab) => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("userData");
      const { token, id } = JSON.parse(userData);
      const response = await fetchBill(token);
      if (response.data.success === true) {
        if (tab === "bills") {
          setBills(response.data.data.paidBills);
          const billabc = await bill(id, token);
          console.log(billabc.data.data.bill.packages);
          setBillToPay(billabc.data.data.bill.packages);
        } else {
          setReceipts(response.data.data.paidReceipts);
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };
  function parsePackage(packageString) {
    const packageObject = {};
    packageString = packageString.replace(/^{+|}+$/g, "");
    const pairs = packageString.split(",\n");
    pairs.forEach((pair) => {
      const [key, value] = pair.split(":").map((part) => part.trim());
      const cleanKey = key.replace(/'/g, "");
      const cleanValue = value.replace(/'/g, "");
      packageObject[cleanKey] = cleanValue;
    });
    return packageObject;
  }


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


  const handlePayPress = async (url) => {
    if (billTopPay.price === 1700) {
      try {
        const body = {
          userId: userData.id,
          someStringData: "paid",
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL("https://buy.stripe.com/test_5kA28F3A51cp7PqbIJ");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (billTopPay.price === 2200) {
      try {
        const body = {
          userId: userData.id,
          someStringData: "paid",
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL("https://buy.stripe.com/test_dR67sZ7Qlf3ffhS7su");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (billTopPay.price === 2500) {
      try {
        const body = {
          userId: userData.id,
          someStringData: "paid",
        };
        const response = await buyPackage(body, token);
        if (response.data.success === true) {
          Alert.alert("Open to pay Bill.", "Thank You.", [{ text: "." }]);
          Linking.openURL("https://buy.stripe.com/test_eVa28F8UpbR34De3cf");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "bills" && styles.selectedTabButton,
          ]}
          onPress={() => setSelectedTab("bills")}
        >
          <Text style={styles.tabButtonText}>Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "receipts" && styles.selectedTabButton,
          ]}
          onPress={() => setSelectedTab("receipts")}
        >
          <Text style={styles.tabButtonText}>Receipts</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <>
            {selectedTab === "bills" && (
              <>
                <View style={styles.billToPayContainer}>
                  <Text style={styles.billToPayText}>Bill to Pay</Text>
                  {billTopPay && (
                    <View>
                      <View style={styles.billToPayInner}>
                      <Text style={styles.packageLeft}>
                        Package: {billTopPay.label}
                      </Text>
                      <Text style={styles.packageRight}>
                        Price: {billTopPay.price}
                      </Text>
                      </View>
                      <TouchableOpacity style={styles.billToPayButton} onPress={handlePayPress}>
                        <Text>Tap here to pay</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {bills && bills.length > 0 ? (
                  bills.map(
                    (bill, index) =>
                      bill.status === "pending" && (
                        <View key={index} style={styles.receipt}>
                          <View style={styles.status}>
                            <Text style={styles.statusText}>
                              Wait for payment Confirmation
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.heading}>
                              Bill # {bill._id}
                            </Text>
                          </View>
                          <View style={styles.date}>
                            <Text style={styles.dateLeft}>Date and Time</Text>
                            <Text style={styles.dateRight}>
                              {new Date(bill.createdAt).toLocaleString()}
                            </Text>
                          </View>
                          <View style={styles.packages}>
                            <Text style={styles.packageLeft}>
                              Package: {parsePackage(bill.packages[0]).label}
                            </Text>
                            <Text style={styles.packageRight}>
                              Price: {parsePackage(bill.packages[0]).price}
                            </Text>
                          </View>
                        </View>
                      )
                  )
                ) : (
                  <Text>No bills found</Text>
                )}
              </>
            )}
            {selectedTab === "receipts" && (
              <>
                {bills && bills.length > 0 ? (
                  bills.map(
                    (bill, index) =>
                      bill.status === "approved" && (
                        <View key={index} style={styles.approvedReceipt}>
                          <View style={styles.status}>
                            <Text style={styles.approvedStatusText}>paid</Text>
                          </View>
                          <View>
                            <Text style={styles.heading}>
                              Bill # {bill._id}
                            </Text>
                          </View>
                          <View style={styles.date}>
                            <Text style={styles.dateLeft}>Date and Time</Text>
                            <Text style={styles.dateRight}>
                              {new Date(bill.createdAt).toLocaleString()}
                            </Text>
                          </View>
                          <View style={styles.packages}>
                            <Text style={styles.packageLeft}>
                              Package: {parsePackage(bill.packages[0]).label}
                            </Text>
                            <Text style={styles.packageRight}>
                              Price: {parsePackage(bill.packages[0]).price}{" "}
                            </Text>
                          </View>
                        </View>
                      )
                  )
                ) : (
                  <Text>No reciepts found</Text>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsAndReceipt;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingTop: 80,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  billToPayContainer: {
    alignItems: "center",
    width: windowWidth - 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#EDD6BE",
    paddingVertical: 20,
    borderRadius: 10,
  },
  billToPayInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  billToPayButton:{
    backgroundColor: "#95DCB1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
    elevation: 3,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  billToPayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },

  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateLeft: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  dateRight: {
    fontSize: 12,
    color: "#000",
  },
  packages: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  packageLeft: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#90D4D3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
  },
  packageRight: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#F7C9CE",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
  },
  status: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
  },

  approvedStatusText: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#68C098",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
  },
  receipt: {
    width: windowWidth - 40,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },

  approvedReceipt: {
    width: windowWidth - 40,
    backgroundColor: "#AFD8AC",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    width: "50%",
  },
  selectedTabButton: {
    backgroundColor: "#3498db",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#000",
  },
});

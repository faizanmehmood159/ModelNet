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
} from "react-native";
import { fetchBill } from "../../api/packages";

const BillsAndReceipt = () => {
  const [bills, setBills] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("bills"); // 'bills' or 'receipts'

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
                            <Text style={styles.packageLeft}>Package: {bill.packages.label}</Text>
                            <Text style={styles.packageRight}>Price: {bill.packages.price}</Text>
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
                {receipts && receipts.length > 0 ? (
                  receipts.map((receipt, index) => (
                    <View key={index} style={styles.receipt}>
                      <Text style={styles.packageLeft}>Receipt</Text>
                      <Text style={styles.packageRight}>
                        Date: {receipt.date}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text>No receipts found</Text>
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
    padding: 20,
    paddingTop: 80,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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

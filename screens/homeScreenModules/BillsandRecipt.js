import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { fetchBill } from '../../api/packages';

const BillsandRecipt = () => {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBill();
  }, []);

  const getBill = async () => {
    try {
      const userdata = await AsyncStorage.getItem("userData");
      const dataUser = JSON.parse(userdata);
      const token = dataUser.token;
      const _id = dataUser.id;
      const response = await fetchBill(_id, token);
      setBill(response.data.data.bill.packages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.receipt}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Bill</Text>
            <Text style={[styles.status, bill?.status === 'Paid' && styles.paidStatus]}>
              {bill?.status}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Package:</Text>
            <Text style={styles.value}>{bill?.label}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>${bill?.price}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default BillsandRecipt;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receipt: {
    width: windowWidth - 40,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    backgroundColor: '#98c1d9',
    color: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  paidStatus: {
    backgroundColor: '#4CAF50',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
  },
});

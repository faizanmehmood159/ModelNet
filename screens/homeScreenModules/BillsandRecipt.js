import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, ActivityIndicator } from 'react-native';


const BillsandRecipt = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("userData");
      const { token, id } = JSON.parse(userData);
      console.log(token,id);
      const response = await fetch(`http://192.168.100.5:8000/api/v1/auth/allBills`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBills(data.paidBills);
      } else {
        setError(data.message || 'Failed to fetch bills');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching bills');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          {bills && bills.length > 0 ? (
            bills.map((bill, index) => (
              <View key={index} style={styles.receipt}>
                <Text style={styles.heading}>Receipt</Text>
                <Text>Date: {bill.date}</Text>
              </View>
            ))
          ) : (
            <Text>No bills found</Text>
          )}
        </>
      )}
      <Button title="Refresh" onPress={getBills} />
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
    marginBottom: 20,
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

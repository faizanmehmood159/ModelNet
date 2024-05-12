import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { fetchBill } from '../../api/packages';

const BillsandRecipt = () => {


  useEffect(() => {
    getBill();
  }, []);
  const getBill = async () => {
    try {
      const userdata = await AsyncStorage.getItem("userData");
      const dataUser = JSON.parse(userdata);
      const token = dataUser.token
      const data = {
        userId: dataUser.id,
      }
      const response = await fetchBill(data, token);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };


 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.receipt}>
        <Text style={styles.heading}>Receipt</Text>
        <Text>Date: May 10, 2024</Text>
        <Text>Time: 10:00 AM</Text>
        <Text>--------------------------------</Text>
        <Text>Item 1 ........ $10</Text>
        <Text>Item 2 ........ $20</Text>
        <Text>Item 3 ........ $15</Text>
        <Text>--------------------------------</Text>
        <Text>Total: $45</Text>
        <Button title="press me" onPress={getBill} />
      </View>
    </ScrollView>
  );
}

export default BillsandRecipt;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});

import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const BillsandRecipt = () => {
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
    width: windowWidth - 40, // Adjust as needed
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.25, // for iOS shadow
    shadowRadius: 3.84, // for iOS shadow
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

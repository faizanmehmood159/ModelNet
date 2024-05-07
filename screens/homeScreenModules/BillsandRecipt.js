import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import stripe from '@stripe/stripe-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BillsandReceipt = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const { tokenId } = await stripe.createToken({
        card: {
          number: cardNumber,
          expMonth: parseInt(expMonth),
          expYear: parseInt(expYear),
          cvc,
        },
      });
      
      const response = await fetch('http://192.168.1.13/api/v1/auth/payment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(amount) * 100, // Stripe requires amount in cents
          description: description,
          token: tokenId,
        }),
      });
  
      const data = await response.json();
      console.log(data);
      // Handle success or failure based on the response from the backend
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style= {styles.container}>
      <Text>Amount:</Text>
      <TextInput value={amount} onChangeText={setAmount} />
      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Text>Card Number:</Text>
      <TextInput value={cardNumber} onChangeText={setCardNumber} />
      <Text>Expiration Month:</Text>
      <TextInput value={expMonth} onChangeText={setExpMonth} />
      <Text>Expiration Year:</Text>
      <TextInput value={expYear} onChangeText={setExpYear} />
      <Text>CVC:</Text>
      <TextInput value={cvc} onChangeText={setCvc} />
      <Button title="Pay" onPress={handlePayment} />
    </View>
  );
};

export default BillsandReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  

})
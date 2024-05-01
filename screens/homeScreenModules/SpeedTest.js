import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const SpeedTest = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState('');

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SpeedTest</Text>
      <Text style={styles.text}>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>
      {isConnected && <Text style={styles.text}>Connection Type: {connectionType}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default SpeedTest;

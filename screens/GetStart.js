import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from '../constants/Colors';

const GetStart = () => {
  const navigation = useNavigation();

  const NextButton = ({ ...props }) => (
    <Ionicons
      name="arrow-forward-circle"
      size={40}
      color="black"
      style={{ marginHorizontal: 8 }}
      {...props}
    />
  );

  const SkipButton = ({ ...props }) => (
    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
      <Ionicons
        name="chevron-forward-circle"
        size={40}
        color="black"
        {...props}
      />
    </View>
  );

  const Dots = ({ selected }) => {
    let backgroundColor = selected ? 'white' : 'rgb(0,0,0)';

    return (
      <View
        style={{
          width: 8,
          height: 8,
          marginHorizontal: 3,
          borderRadius: 3,
          backgroundColor,
        }}
      />
    );
  };

  const handleDone = () => {
    navigation.navigate('Welcome');
  };

  return (
    <LinearGradient
      colors={['#EAECC6', '#E7E9BB', '#2BC0E4']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Onboarding
          NextButtonComponent={NextButton}
          SkipButtonComponent={SkipButton}
          DotComponent={Dots}
          bottomBarColor="solid"
          onDone={handleDone}
          onSkip={() => navigation.navigate('Welcome')} // Handle skip action
          pages={[
            {
              backgroundColor: 'transparent',
              title: '',
              subtitle: '', // Add a subtitle property
              image: (
                <View style={styles.pageContainer}>
                  <Text style={styles.title}>ModelNet</Text>
                  <Text style={styles.subtitle}>Internet Service Provider</Text>
                  <Image
                    style={styles.image}
                    source={require('../assets/Logo.png')}
                  />
                </View>
                
              ),
            },
            {
              backgroundColor: 'transparent',
              title: (
                <Text style={styles.sectitle}>Description</Text>
              ), 
              subtitle: '', 
              image: (
                <View style={styles.secpageContainer}>
                  <Image
                    style={styles.image2}
                    source={require('../assets/screen1.png')}
                  />
                </View>
              ),
            },
          ]}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'orange',
    letterSpacing: -0.5,
    marginLeft: -30,
  },
  subtitle: {
    fontSize: 15,
    color: 'black',
    marginTop: -10,
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 40,
    marginBottom: -80,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 120,
    backgroundColor: 'transparent',
  },
  image2: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'white',
    padding: 10,
    backgroundColor: 'transparent',
  },
  secpageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Color.Primary,
   
  },
});

export default GetStart;

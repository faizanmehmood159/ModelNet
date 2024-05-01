import React from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SocialMedia from '../components/SocialMedia';
import Title from '../components/Title';
import Color from '../constants/Colors';



const Welcome = ({navigation}) => {
  
  return (
    <LinearGradient
      colors={['#EAECC6', '#E7E9BB', '#2BC0E4']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>ModelNet</Text>
              <Text style={styles.undernameText}>Internet Service Provider</Text>
            </View>
            
            <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
            </View> 

            <View style= {styles.welometext} >
              <Title style={styles.title}>Welcome</Title>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Text style={styles.buttonText}>  Login </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.socialmedia}>
              {/* <SocialMedia /> */}
            </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:100
    // alignItems: 'center',
  },
  contentContainer: {
    // alignItems: 'center',
  },
  contentContainer: {
    marginTop: 10,
    alignItems: 'center',
    // alignContent:'center'
  },

  textContainer:{
    marginLeft:0,
    marginRight:0
  },

  nameText: {
    color: 'orange',
    fontSize: 30,
    fontWeight: 'bold',
    marginRight:30,
    letterSpacing: -0.5,
    
    
    
  },

  undernameText: {
    color: Color.Primary,
    fontSize: 10,
    marginLeft:10,
    marginBottom:-20
  },

  logoImage: {
    width: 100,
    height: 70,
    marginLeft:80,
    marginTop:-5,
    marginBottom:10
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 40,
  },

  welometext:{
    paddingBottom:30,
    paddingRight:200,
    
  },
  buttonContainer: {
    paddingTop: 20,
    
  },
  button: {
    backgroundColor: Color.Primary,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  
});

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Color from '../constants/Colors';
import Profile from './profileScreen/Profile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    fetchUserName();
    fetchUserId();
  }, []);

  const fetchUserName = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.100.5:8000/api/v1/auth/getLoggedInUserName', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUserName(response.data.data.name); // Set the user's name
      } else {
        console.error('Failed to fetch user name:', response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };




  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); // Get user ID from AsyncStorage
      setUserId(userId); // Set the user ID in the component's state
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.100.5:8000/api/v1/auth/getImage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId, // Pass the user ID as a query parameter
        },
      });

      if (response.data.success) {
        setProfileImage(response.data.imageUrl); // Set the profile image URL
      } else {
        console.error('Failed to fetch user data:', response.data.errorMessage);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  
  const data = [
    { id: '1', image: require('../assets/offers1.png'), },
    { id: '2', image: require('../assets/offers.png'),  },
  ];
    
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.flatlistItem}>
      <Image source={item.image} style={styles.flatlistItemImage} resizeMode="cover" />
      <Text style={styles.detailtext2}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#EAECC6', '#E7E9BB', '#2BC0E4']} style={styles.gradient}>
      <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.grid1}>
            <View style={styles.profiletab}> 
              <TouchableOpacity onPress ={()=> navigation.navigate(Profile)} >
    <View style={styles.profile}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
      )}
    </View>
  </TouchableOpacity>
              <View style={styles.detail}>
                <Text style={styles.detailtext1}>{userName}</Text>
              </View>
            </View>
          </View>

          {/* Add FlatList here */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.flatlist}
            horizontal={true} 
          />

          <View style={styles.allgridboxess}>
            <View style={styles.gridboxes}>
              <TouchableOpacity onPress={() => navigation.navigate('SpeedTest')}  style={styles.gridbox1} >
                <View style ={styles.imageContainer}>
                  <Image source={require('../assets/wifi.png')} style={styles.image} />
                  <Text style ={styles.imageText}>Wifi Speed</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('NewInstallation')} style={styles.gridbox2}>
                <View style ={styles.imageContainer}>
                  <Image source={require('../assets/subscription.png')} style={styles.image} />
                  <Text style ={styles.imageText}>Installation </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('AIChatbot')} style={styles.gridbox3}>
                <View style ={styles.imageContainer}>
                  <Image source={require('../assets/AIChatbot.png')} style={styles.image} />
                  <Text style ={styles.imageText}>AI Chatbot</Text>
                </View>
              </TouchableOpacity>

            </View>

            <View style={styles.gridboxes1}>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterComplaint')} style={styles.gridbox1}>
              <View style ={styles.imageContainer}>
                <Image source={require('../assets/complaint.png')} style={styles.image} />
                  <Text style ={styles.imageText}>Regester Complaint</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('CustomerSupport')} style={styles.gridbox2}>
                <View style ={styles.imageContainer}>
                  <Image source={require('../assets/CustomerSupport.png')} style={styles.image} />
                  <Text style ={styles.imageText}>Customer Support </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('BillsandReceipt')} style={styles.gridbox3}>
                <View style ={styles.imageContainer}>
                  <Image source={require('../assets/bill.png')} style={styles.image} />
                  <Text style ={styles.imageText}>Bills & Recipts</Text>
                </View>
              </TouchableOpacity>

            </View>
            
          </View>
        </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  safearea: {
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: 10,
   
  },

  allgridboxess: {
    paddingBottom: 50,
  },

  grid1: {
    marginTop: 40,
    marginBottom: 10,
    marginLeft:3,
    width:358,
    height: 80,
    backgroundColor:Color.Secondary,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 1,
    elevation: 5,
    flexDirection: 'row',
    
    alignItems: 'center',
  },

  profiletab:{
    marginLeft:20,
    marginTop:1,
    flexDirection:'row',
    alignItems:'center',
  },

  profile: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  profileimage:{
    height:61,
    width:60,
    borderRadius:36,
  },

  text: {
    fontSize: 60,
    fontWeight: 'bold',
    justifyContent: 'center',
    
  },

  detail: {
    marginEnd: 100,
  },

  detailtext1: {
    
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold', 
    paddingLeft:10,
    justifyContent:'center',
    textAlign:'center',
    alignContent:'center'
  },

  detailtext2: {
    color: 'black',
  },

  flatlist: {
    marginLeft:3,
    marginRight:3, 
    marginBottom: 10,
  },

  flatlistItem: {
    backgroundColor: 'white',
    height: 200,
    width: 300,
    marginRight: 5,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },

  flatlistItemImage: {
    borderRadius: 10,
  },

  gridboxes: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal: 3,
  },

  gridboxes1: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 3,
  },

  gridbox1: {
    flex: 1,
    backgroundColor: Color.Secondary,
    height: 130,
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    
  },

  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent:'center',
    
  },
  
  image: {
    height: 60,
    width: 60,
  },
  
  imageText: {
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  

  gridbox2: {
    flex: 1,
    backgroundColor: Color.Secondary,
    height: 130,
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 5,
  },

  gridbox3: {
    flex: 1,
    backgroundColor: Color.Secondary,
    height: 130,
    padding: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 75,
    borderWidth: 5,
  },
});

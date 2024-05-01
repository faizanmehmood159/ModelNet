// Navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStart from '../screens/GetStart';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home'; // Import the Home component
import Forgot from '../screens/forgotAndReseetPassword/Forgot';
import ResetPassword from '../screens/forgotAndReseetPassword/ResetPassword';
import SpeedTest from '../screens/homeScreenModules/SpeedTest';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import RegisterComponent from '../screens/homeScreenModules/RegisterComplain';
import NewInstallation from '../screens/homeScreenModules/NewInstallation';
import SettingScreen from '../screens/bottomTabScreens/SettingScreen';
import Profile from '../screens/profileScreen/Profile';
import ChangePassword from '../screens/profileScreen/ChangePassword';
import ChangeName from '../screens/profileScreen/ChangeName';
import FAQ from '../screens/profileScreen/FAQ';
import BillsandReceipt from '../screens/homeScreenModules/BillsandRecipt';
import AIChatbot from '../screens/homeScreenModules/AIChatbot';
import CustomerSupport from '../screens/homeScreenModules/CustomerSupport';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="GetStart" component={GetStart} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{headerTransparent: true}} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerTransparent: true}} />
        <Stack.Screen name="ChangeName" component={ChangeName} options={{headerTransparent: true}} />
        <Stack.Screen name="FAQ" component={FAQ} options={{headerTransparent: true}} />
        <Stack.Screen name="SpeedTest" component={SpeedTest}  />
        <Stack.Screen name="AIChatbot" component={AIChatbot} options={{headerTransparent: true}} />
        <Stack.Screen name="NewInstallation" component={NewInstallation} options={{headerTransparent: true}} />
        <Stack.Screen name="RegisterComponent" component={RegisterComponent}  options={{headerTransparent: true}} />
        <Stack.Screen name="CustomerSupport" component={CustomerSupport}  options={{headerTransparent: true}} />
        <Stack.Screen name="BillsandReceipt" component={BillsandReceipt }  options={{headerTransparent: true}} />
        <Stack.Screen name="Register" component={RegisterComponent}  options={{headerTransparent: true}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};



const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        

        tabBarStyle: {
          backgroundColor: 'white',
          height: 60, 
          
          borderRadius: 20,
          width:350,
          marginLeft:15        
        },
      }}
    >
      <Tab.Screen
        name="Home Screen"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <View >
              <Text style={{ ...styles.iconText, color }}>🏠</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Profile}
        options={{
          headerShown: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ ...styles.iconText, color }}>⚙️</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};



const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    flexDirection: 'row',
  },
});

export default Navigation;

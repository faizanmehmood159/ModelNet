import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStart from '../screens/GetStart';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Forgot from '../screens/forgotAndReseetPassword/Forgot';
import ResetPassword from '../screens/forgotAndReseetPassword/ResetPassword';
import SpeedTest from '../screens/homeScreenModules/SpeedTest';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import RegisterComplaint from '../screens/homeScreenModules/RegisterComplain';
import NewInstallation from '../screens/homeScreenModules/NewInstallation';
import SettingScreen from '../screens/bottomTabScreens/SettingScreen';
import Profile from '../screens/profileScreen/Profile';
import ChangePassword from '../screens/profileScreen/ChangePassword';
import ChangeName from '../screens/profileScreen/ChangeName';
import FAQ from '../screens/profileScreen/FAQ';
import BillsandReceipt from '../screens/homeScreenModules/BillsandRecipt';
import AIChatbot from '../screens/homeScreenModules/AIChatbot';
import CustomerSupport from '../screens/homeScreenModules/CustomerSupport';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUserToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const authContext = {
    signIn,
    signOut,
    userToken,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken ? (
            <>
              <Stack.Screen name="Home" component={BottomTab} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerTransparent: true }} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTransparent: true }} />
              <Stack.Screen name="ChangeName" component={ChangeName} options={{ headerTransparent: true }} />
              <Stack.Screen name="FAQ" component={FAQ} options={{ headerTransparent: true }} />
              <Stack.Screen name="SpeedTest" component={SpeedTest} options={{ headerTransparent: true }} />
              <Stack.Screen name="AIChatbot" component={AIChatbot} options={{ headerTransparent: true }} />
              <Stack.Screen name="NewInstallation" component={NewInstallation} options={{ headerTransparent: true }} />
              <Stack.Screen name="RegisterComplaint" component={RegisterComplaint} options={{ headerTransparent: true }} />
              <Stack.Screen name="CustomerSupport" component={CustomerSupport} options={{ headerShown: false }} />
              <Stack.Screen name="BillsandReceipt" component={BillsandReceipt} options={{ headerTransparent: true }} />
              <Stack.Screen name="Register" component={RegisterComplaint} options={{ headerTransparent: true }} />
            </>
          ) : (
            <>
              <Stack.Screen name="GetStart" component={GetStart} options={{ headerShown: false }} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
              <Stack.Screen name="Forgot" component={Forgot} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          borderRadius: 100,
          marginHorizontal:20,
          marginBottom:-60,
          bottom:100
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home Screen') {
            iconName = 'home';
          } else if (route.name === 'Setting') {
            iconName = 'account-settings';
          }

          // You can set the background color to red when the tab is active
          const iconStyle = {
            backgroundColor: route.name === 'Home Screen' || 'setting' ? color === 'black' ? '#2BC0E4' : 'white' : 'white',
            borderRadius: 200,
            padding: 4,
          };

          return (
            <View style={[styles.tabIcon, iconStyle]}>
              <MaterialCommunityIcons name={iconName} size={32} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home Screen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={Profile}
        options={{ headerTransparent: true }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation;

import React from "react";
import 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from './RootNavigation';
import LogInScreen from "./src/screens/Log In/LoginScreen";
import Drawer from "./src/screens/Drawer/Drawer";
import Registration from "./src/screens/Sign Up/Registration";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import GroupChat from "./src/screens/Group Chat/GroupChat";
import UserDetails from "./src/screens/User Details/UserDetails";

// createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator.
const Stack = createStackNavigator();

export default function App() {

  return (
    // The ref object includes all of the common navigation methods such as navigate, goBack etc.
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="login"
        screenOptions={{
          headerShown: false
        }}>

        {/* Login Screen */}
        <Stack.Screen
          name="login" // this name var is used for navigation , also used in RootNavigation.
          component={LogInScreen} // component name is used from above import statements
        />

        {/* Register Screen */}
        <Stack.Screen
          name="register" 
          component={Registration} 
        />

        {/* drawer Screen */}
        <Stack.Screen
          name="drawer" 
          component={Drawer} 
        />

        {/* Dashboard Screen */}
        <Stack.Screen
          name="dashboard" 
          component={Dashboard} 
        />

        {/* Dashboard Screen */}
        <Stack.Screen
          name="userdetails" 
          component={UserDetails} 
        />

        {/* Group Chat Screen */}
        <Stack.Screen
          name="groupchat" 
          component={GroupChat} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerContent, DrawerItemList } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import ManageUsers from '../Manage Users/ManageUsers';
import GroupChat from '../Group Chat/GroupChat';
import ManageDocs from '../Manage Documents/ManageDocs';
import Dashboard from '../Dashboard/Dashboard';
import * as RootNavigation from '../../../RootNavigation';
import AsyncStorage from "@react-native-async-storage/async-storage";


// createDrawerNavigator component, It is basically the UI panel that displays the navigation menu. It is hidden by default but will appear when the user swipes a finger from the edge of the screen.
const Drawer = createDrawerNavigator();

export default function DrawerOnDashBoard() {
    const [currentUser, setCurrentUser] = useState([]);
    // let key = "currentUserData";

    const navToLoginPage = () => {
        RootNavigation.navigate("login");
    }

    const navToUserDetailsPage = () => {
        RootNavigation.navigate("userdetails");
    }

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, []);


    const clearAppData = async function () {
        try {
            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
            console.log('Clearing app data.');
            navToLoginPage();
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }

    return (
        <View style={styles.container}>
            <Drawer.Navigator initialRouteName='Manage Documents'
                drawerContent={props => {
                    return (
                        <DrawerContentScrollView {...props}>
                            <TouchableOpacity onPress={()=>navToUserDetailsPage()} >
                                <Image style={styles.img} source={{ uri: currentUser.image }} />
                            </TouchableOpacity>
                            <DrawerItemList {...props} />
                            <DrawerItem label="Logout" onPress={clearAppData} />
                        </DrawerContentScrollView>
                    )
                }}
            >
                <Drawer.Screen
                    name="Dashboard"
                    component={Dashboard} />
                <Drawer.Screen
                    name="Manage Users"
                    component={ManageUsers} />
                <Drawer.Screen
                    name="Group Chat"
                    component={GroupChat} />
                <Drawer.Screen
                    name="Manage Documents"
                    component={ManageDocs} />
            </Drawer.Navigator>
        </View>
    );
}

// results[0].name.first

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    img: {
        height: 150,
        borderBottomEndRadius: 10
    }
})

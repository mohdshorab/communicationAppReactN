import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function UserDetails() {
    const [currentUser, setCurrentUser] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, []); 


    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: currentUser.image }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{currentUser.name}</Text>
                    <Text style={styles.description}>{currentUser.email}</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>{currentUser.phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text>{currentUser.password}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        // : <Text>Error</Text>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 50
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});


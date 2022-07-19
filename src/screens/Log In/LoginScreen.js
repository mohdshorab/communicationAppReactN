import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useState } from "react";
import * as RootNavigation from "../../../RootNavigation";
// async storage 
import AsyncStorage from "@react-native-async-storage/async-storage";
// using DB reference
import { db } from "../../firebase/firebaseConfig";

export default function LogInScreen() {
    const [loggedUserData, setLoggedUserData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerUserData, setRegisteredUserData] = useState([]);
    let currentUserUid;
    let currentUserIndex;
    // let currentUserIndex =0;
    console.log(email, password);

    const navToDashboard = () => {
        RootNavigation.navigate("drawer");
    }

    const navToRegisterPage = () => {
        RootNavigation.navigate("register");
    }


    useEffect(()=>{
        db.ref("RegisteredUsers")
        .once("value")
        .then((item)=>{
            let user =[];
            item.forEach((childSnapshot)=>{
                user.push(childSnapshot.val());
            });
            setRegisteredUserData(user);
            console.log(registerUserData);
        })
    }, []);



    function getCurrentUser() {
        for (let i = 0; i < registerUserData.length; i++) {
            if (email == registerUserData[i].email && password==registerUserData[i].password) {
                currentUserUid = registerUserData[i].id;
                currentUserIndex = i;
                console.log(currentUserUid + " " + currentUserIndex);
                return true;
            }
        }
        return false;
    }
    let isUserExist = getCurrentUser();


   


    // pushing obj to local storage
    postMessage = () => {
        let dot = email.indexOf(".");
        let atrate = email.indexOf("@");
        console.log("postMessage fn starts");
        if (!email) {
            Alert.alert("Please enter the email.")
        } else if (!password) {
            Alert.alert("Please enter the password")
        }
        else if (dot < 1 || dot - atrate < 2) {
            Alert.alert("Wrong email format!");
        }
        else if (isUserExist == false) {
            Alert.alert("No such user found")
            console.log("No such user found")
        }
        else if (password != registerUserData[currentUserIndex].password) {
            Alert.alert("Entered the wrong password")
            console.log("Entered the wrong password")
        }
        else {
            console.log("pushing data to asyncstorage")
            const currentUserData = {
                id: currentUserUid,
                name:registerUserData[currentUserIndex].name,
                email: registerUserData[currentUserIndex].email,
                password: registerUserData[currentUserIndex].password,
                image: registerUserData[currentUserIndex].image,
                phone: registerUserData[currentUserIndex].phone
            };
            AsyncStorage.setItem('currentUserData', JSON.stringify(currentUserData),
                () => {
                    AsyncStorage.getItem('currentUserData',
                        (_err, result) => { console.log(result) })
                })
            navToDashboard();
        }
        console.log("postMessage fn ends");
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }} />
            <View style={styles.inputView}>
                <Text>Email</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="abc@xyz.com"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <Text>Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="* * * * * * *"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={postMessage} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={navToRegisterPage}>
                <Text style={styles.loginText}>Register Yourself? </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        width: 350,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 30
    },
    loginBtn: {
        backgroundColor: "#ffff00",
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
        borderColor: "#008000",
        elevation: 20,

    },
    loginText: {
        fontWeight: "bold",

    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginTop: 80,
        marginBottom: 30
    },
    registerBtn: {
        marginTop: 10,
    }
});
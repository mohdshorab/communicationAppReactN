import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Button
} from "react-native";
import { useState, useEffect } from "react";
import * as RootNavigation from "../../../RootNavigation";
import * as ImagePicker from 'expo-image-picker';
// using db reference
import { db } from "../../firebase/firebaseConfig";

export default function Registration() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePass, setRePass] = useState("");
    const [registerUserData, setRegisteredUserData] = useState([]);
    const [hasGalleryPermision, setHasGalleryPermision] = useState(null);
    const [image, setImage] = useState(null);
    console.log(email, password);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermision(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    if (hasGalleryPermision === false) {
        return <Text>No access to internal storage</Text>
    }


    useEffect(() => {
        db.ref("RegisteredUsers")
            .once("value")
            .then((item) => {
                let user = [];
                item.forEach((childSnapshot) => {
                    user.push(childSnapshot.val());
                });
                setRegisteredUserData(user);
                console.log(registerUserData);
            })
    }, []);


    // nav to login page
    const navToLoginPage = () => {
        RootNavigation.navigate("login");
    }

    // Checking user exists or not
    const IsUserExist = () => {
        console.log("checking that user exist or not");
        for (let i = 0; i < registerUserData.length; i++) {
            if (email == registerUserData[i].email) {
                console.log("user already exist with ID :" + registerUserData[i].id);
                return true;
            }
        }
        return false;
    }


    // pushing obj to firebase
    postMessage = () => {
        console.log("checking validation");
        let dot = email.indexOf(".");
        let atrate = email.indexOf("@");
        let userExistOrNot = IsUserExist();
        if (!email) {
            Alert.alert("Please enter the email.")
        } else if (!password && password != rePass) {
            Alert.alert("Please enter the password")
        }
        else if (dot < 1 || dot - atrate < 2) {
            Alert.alert("Wrong email format!");
        } else if (userExistOrNot == true) {
            Alert.alert("User already exist.");
            console.log("User already exist.");
        }
        else {
            console.log("pushing obj to firebase");
            const data = {
                id: Number(new Date()),
                name: fullname,
                email: email,
                phone: phone,
                password: password,
                image: image
            };
            db.ref('RegisteredUsers').update({ [data.id]: data }).then(() => {
                console.log("Inserted");
                navToLoginPage();
            }).catch((error) => {
                console.log(error);
            })
        }
        console.log("postMessage fn ends");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }} />
                <Text style={styles.head}>Registration</Text>
            </View>
            <View style={styles.inputView}>
                <Text>Full Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="John Wick"
                    value={fullname}
                    onChangeText={(fullname) => setFullname(fullname)}
                />
            </View>
            <View style={styles.inputView}>
                <Text>Phone</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="9876543210"
                    value={phone}
                    onChangeText={(phone) => setPhone(phone)}
                />
            </View>
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
            <View style={styles.inputView}>
                <Text>Confirm Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="* * * * * * *"
                    secureTextEntry={false}
                    value={rePass}
                    onChangeText={(rePass) => setRePass(rePass)}
                />
            </View>
            <View style={styles.ImagePicker}>
                {/* <Text>Select Image</Text> */}
                <Button
                    style={styles.ImagePickerBtn}
                    title='Pick Image'
                    onPress={() => pickImage()}
                />
                {image && <Image source={{ uri: image }} style={{ flex: 1 / 2 }} />}
            </View>
            <TouchableOpacity style={styles.registerBtn} onPress={postMessage} >
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        paddingTop: 30
        // flexDirection: "column",
        // alignItems: "flex-start"
    },
    textInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        width: 350,
        borderRadius: 10,
        paddingLeft: 20,
        marginBottom: 10
    },
    registerBtn: {
        backgroundColor: "#ffff00",
        padding: 10,
        marginBottom: 100,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
        borderColor: "#008000",
        elevation: 20,

    },
    loginText: {
        fontWeight: "bold",

    },
    header: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 10,
        // marginTop: 10,
        // marginBottom: 30,
    },
    head: {
        fontWeight: "bold",
        fontSize: 30,
        paddingLeft: 20,
        // paddingTop: 12
    },
    ImagePicker: {
        marginBottom: 10,

    }
});
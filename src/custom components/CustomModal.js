import React, { useEffect, useState } from "react";
import {
    StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert, Button
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase/firebaseConfig";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 150;

const CustomModal = (props) => {
    const [userName, setUserName] = useState("");
    const [currentUser, setCurrentUser] = useState([]);
    const [updatedUser, setUpdatedUser] = useState([]);
    const [registerUserData, setRegisteredUserData] = useState([]);
    let selectedUserID = props.id;
    let currentUserID;
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

    useEffect(() => {
        for (let index = 0; index < registerUserData.length; index++) {
            if (registerUserData[index].id == selectedUserID) {
                console.log(registerUserData[index].name+" "+updatedUser)
                setUserName(registerUserData[index].name)
                currentUserID = index;
            }
        }
    })

    const updateDataInFB = async () => {
        if (!userName) {
            Alert.alert("Username can't be empty");
            alert("Username can't be empty");
        } else {
            const updatingDataInCurrent = {
                id: registerUserData[currentUserID].id,
                name:updatedUser,
                email: registerUserData[currentUserID].email,
                password: registerUserData[currentUserID].password,
                image: registerUserData[currentUserID].image
            };
            if(currentUser.id==registerUserData[currentUserID].id){
                console.log("Updating current user")
                AsyncStorage.setItem("currentUserData",updatingDataInCurrent );
            }
            db.ref('/RegisteredUsers/' + selectedUserID)
                .update({
                    name: updatedUser,
                })
                .then(() => console.log('Data updated.'));
            

        }
    }





    // const showUserId = () => {
    //     console.log(props.id);
    // }
    const closeModal = (bool) => {
        props.changeModalVisible(bool);
        // props.setData(data);
    }

    useEffect(() => {
        AsyncStorage.getItem('currentUserData',
            (_err, result) => {
                console.log(result)
                let arrObj = JSON.parse(result)
                setCurrentUser(arrObj);
            })
    }, []);



    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={[styles.text, { fontSize: 20 }]}>Edit User</Text>
                </View>
                <View style={styles.modalBody}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUpdatedUser}
                        // value={number}
                        placeholder={userName}
                        // keyboardType="numeric"
                    />
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => closeModal(false, 'Cancel')} style={styles.touchableOpacity} >
                        <Text style={[styles.text, { color: "blue" }]} >Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { updateDataInFB(); closeModal(false, 'Ok'); }} style={styles.touchableOpacity} >
                        <Text style={[styles.text, { color: "blue" }]} >OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textView: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    btnView: {
        width: '100%',
        flexDirection: 'row'
    },
    touchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center"
    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5
    },
    btn: {
        borderRadius: 10
    }
})

export { CustomModal }